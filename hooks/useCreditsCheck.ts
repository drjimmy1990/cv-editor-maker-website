import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

interface CreditCheckResult {
    hasEnoughCredits: boolean;
    currentCredits: number;
    requiredCredits: number;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    checkCredits: (required: number) => boolean;
}

/**
 * Hook to check if user has enough credits for a service
 * @param defaultRequired - Default required credits for this service
 * @returns Credit check result with modal state and check function
 * 
 * Usage:
 * ```tsx
 * const { hasEnoughCredits, showModal, setShowModal, checkCredits, currentCredits, requiredCredits } = useCreditsCheck(10);
 * 
 * const handleUseService = () => {
 *   if (!checkCredits(10)) {
 *     // Modal will open automatically
 *     return;
 *   }
 *   // Proceed with service
 * };
 * 
 * return (
 *   <>
 *     <button onClick={handleUseService}>Use Service</button>
 *     <InsufficientCreditsModal
 *       isOpen={showModal}
 *       onClose={() => setShowModal(false)}
 *       requiredCredits={requiredCredits}
 *       currentCredits={currentCredits}
 *       serviceName="CV Optimizer"
 *     />
 *   </>
 * );
 * ```
 */
export const useCreditsCheck = (defaultRequired: number = 0): CreditCheckResult => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [requiredCredits, setRequiredCredits] = useState(defaultRequired);

    const currentCredits = user?.credits_cv ?? 0;

    const checkCredits = useCallback((required: number): boolean => {
        setRequiredCredits(required);
        const hasEnough = currentCredits >= required;
        if (!hasEnough) {
            setShowModal(true);
        }
        return hasEnough;
    }, [currentCredits]);

    return {
        hasEnoughCredits: currentCredits >= requiredCredits,
        currentCredits,
        requiredCredits,
        showModal,
        setShowModal,
        checkCredits,
    };
};
