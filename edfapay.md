--- URL: https://docs.edfapay.com/docs/ ---

###

Welcome to EdfaPay Payment Gateway

EdfaPay enables businesses to accept payments online with speed, security, and
flexibility. Whether you’re integrating for the first time or managing
multiple merchants, this guide will help you move from setup to going live
smoothly.

###

Who We Are ?

EdfaPay is a leading payment technology company that simplifies how businesses
collect payments. Our mission is to empower merchants and partners with
reliable, fast, and secure payment solutions designed for the modern digital
world.

Currently operating across the GCC region, EdfaPay offers a scalable and
developer-friendly platform for e-commerce, retail, and fintech partners.

###

How Does EdfaPay Work?

  1. **Create Your Account** — Register and verify your merchant profile.
  2. **Integrate Your Store** — Use our Hosted Checkout or Server-to-Server APIs.
  3. **Start Accepting Payments** — Go live and begin processing transactions securely.

###

What We Offer

###

Flexible Integration Options

Choose from:

  * **Hosted Checkout** — Quick setup and secure hosted pages.
  * **Server-to-Server (S2S)** — Full control with seamless backend integration.

###

Multiple Payment Methods

Accept **credit cards, debit cards, Apple Pay, STC Pay** , and more.

###

Real-Time Monitoring

Track transactions, settlements, and refunds from your **EdfaPay Dashboard**.

###

Security & Compliance

PCI-DSS certified infrastructure ensuring every payment is processed safely.

###

Why Choose EdfaPay?

  * **Empower your business** — Offer smooth, fast payment experiences to your customers.
  * **Boost conversion** — Reduce cart abandonment with local payment methods.
  * **Simple, flexible, and scalable** — Built for startups and enterprises alike.
  * **Instant settlements** — Receive your funds without delays.
  * **Dedicated support** — A professional team to assist you at every step.

###

Ready to Begin?

Follow our step-by-step setup guide to start integrating EdfaPay today.

Integration Overview

Understand how EdfaPay’s system works before you start integrating.

Merchant Registration

Register your business and get your test credentials.

**EdfaPay — Powering secure payments for modern businesses.**

Updated 3 months ago

Overview

Ask AI



--- URL: https://docs.edfapay.com/docs/embedded-apple-pay-implementation-go-live ---

###

Frontend Apple Pay Button Implementation

  1. Use Apple Pay JS API to render the Apple Pay button on your checkout page.
  2. Ensure the merchantIdentifier matches your Apple Merchant ID.
  3. Set the supported payment networks (e.g., visa, masterCard).
  4. Handle the onpaymentauthorized event to capture the payment token.

> 💡
>
> **Tip:** Apple Pay button styles (black, white, outline) and localization
> options are available in Apple’s official documentation.

**Draw Apple Pay Buttons**

HTMLCSS

HTML

    
    
    <div class="apple-pay-button-with-text apple-pay-button-white-with-text">
    <span class="text">Buy with</span>
    <span class="logo"></span>
    </div>

###

Backend Payment Request to EdfaPay S2S API

  1. Receive the Apple Pay payment token from your frontend.
  2. Pass the token to EdfaPay’s S2S Sale API in the source field.
  3. Include all required authentication parameters (client_key, password, hash).
  4. Handle the API response and update the order status accordingly in your system.

###

Go Live Checklist

  * Test on a real Apple Pay-enabled device in production mode (sandbox not supported).
  * Verify successful transactions in the EdfaPay dashboard.
  * Ensure all Apple Pay domain verifications and certificates are active.
  * Contact EdfaPay Support for onboarding confirmation or troubleshooting assistance.

Updated 3 months ago

Embedded Apple Pay— Configuration Guide

Apple Pay—Troubleshooting & Error Codes

Ask AI



--- URL: https://docs.edfapay.com/docs/edfapay-partner ---

#

Welcome to EdfaPay API Documentation

EdfaPay provides a comprehensive, full-stack fintech platform designed to
empower businesses with seamless, secure, and efficient online and offline
payment processing. Our robust payment gateway solution simplifies integration
and offers extensive functionalities tailored for modern financial operations.

##

Why Choose EdfaPay?

EdfaPay stands out with its powerful features, prioritizing reliability,
security, and global accessibility , ensuring your business can thrive in the
digital economy.

  * **Secure Transactions:** Adheres to **PCI DSS** standards and supports **3D Secure** protocols, ensuring the highest level of payment security and data protection.
  * **Flexible Payments:** Accepts all major **credit/debit cards** ,as well as diverse **mobile wallets** , and facilitates **multi-currency transactions** for global reach.
  * **Soft POS Solution:** Transform any **Android device into a fully functional Point of Sale (POS) terminal** using our innovative app, significantly reducing hardware costs.
  * **White-Label Solutions:** Customizable **payment gateway** and **Soft POS solutions** specifically designed to meet the branding and operational needs of B2B clients.
  * **Unified Dashboard:** Gain **real-time insights and complete control** over all transactions and services through a single, intuitive, and comprehensive platform.
  * **Rapid Settlement:** **Mada** transactions settle **daily** , while **Visa and MasterCard** payments are settled efficiently within **24–72 hours**.

##

EdfaPay Capabilities

Unlock a wide array of powerful functionalities designed to streamline your
financial operations and enhance customer experience with the EdfaPay
platform.

Online Payment Acceptance

Seamlessly accept online payments across various channels, including major
credit/debit cards, Apple Pay, Mada, and other popular digital payment
methods.

Transaction Management

Efficiently monitor, track, and manage all your incoming and outgoing
transactions through the intuitive EdfaPay Dashboard, providing clear
oversight.

Invoice Management

Effortlessly issue, track, and manage invoices, automating your billing
processes and ensuring timely payments.

Detailed Reporting

Access comprehensive reporting tools that enable accurate financial tracking,
reconciliation of payments, and informed business decisions.

Flexible Integration

Integrate EdfaPay effortlessly with your existing websites, e-commerce
platforms, and mobile applications through well-documented APIs and SDKs.

Refund & Chargeback Management

Handle refunds and manage chargebacks effectively directly from your
dashboard, ensuring customer satisfaction and dispute resolution.

##

Documentation Overview

Navigate through the key sections of our documentation to quickly find the
information you need to successfully integrate and utilize EdfaPay.

Authentication & Security

Learn how to securely authenticate your API requests and protect your
transactions with our robust security protocols.

Payment APIs

A comprehensive, step-by-step guide to initiating, processing, and managing
various types of payments via our versatile APIs.

Dashboard Management

Understand how to leverage the unified EdfaPay Dashboard for comprehensive
monitoring, detailed reporting, and efficient transaction management.

Testing & Sandbox

Access our dedicated sandbox environment, test data, and sample scenarios to
facilitate seamless integration and thorough testing before going live.

Error Codes & Handling

A clear and detailed reference for understanding, diagnosing, and effectively
handling various API error responses and their resolutions.

Webhooks

Discover how to configure and utilize webhooks to receive real-time
notifications about transaction statuses and other critical events.

##

Simplified Integration Flow

Integrating EdfaPay into your existing system is a straightforward and secure
process designed for ease of implementation, offering flexibility at each
step:

  1. **Initiate Payment:** Customers can initiate payments through various channels, including your website or mobile application, starting the secure transaction process.
  2. **Flexible Redirection:** Customers are securely redirected to EdfaPay’s adaptable payment page, allowing them to complete their transaction conveniently.
  3. **Diverse Payment Options:** Transactions are finalized using a wide range of preferred payment methods, such as credit/debit cards, mobile wallets, and more.
  4. **Real-time Status Updates:** EdfaPay provides instant and secure callbacks to your system, delivering timely transaction status information.
  5. **Customizable Redirection:** Based on the transaction outcome, customers are seamlessly redirected to your specified success or failure pages, offering a tailored user experience.

We are committed to providing you with the tools and support needed for a
smooth and successful integration. Explore the documentation and start
building with EdfaPay today!

Updated 3 months ago

Overview

Edfapay White Label Solutions

Ask AI



--- URL: https://docs.edfapay.com/docs/edfapay-white-label-solutions ---

##

Boost Your Business with a Fully Branded Payment Platform

EdfaPay White Label Solutions empower you to deliver payment services under
your own brand while EdfaPay manages the technology behind the scenes. Choose
between a turnkey cloud-hosted model for fast deployment or a self-hosted
model for complete control. With advanced features like SoftPOS, subscription
billing, and split payouts, you can scale your payment offering quickly and
securely.

##

Why Choose EdfaPay White Label Solutions?

EdfaPay provides a robust platform to launch and grow your branded payment
service with unparalleled advantages:

• **Full Brand Control** : Maintain complete ownership of your brand identity,
from logo and colors to the services you offer.

• **Cost-Effective Scalability** : Grow your payment offering quickly without
the complexity and expense of building infrastructure from scratch.

• **Seamless Integration** : Effortlessly integrate our solutions with your
existing systems and infrastructure.

• **Advanced Security** : Benefit from EdfaPay's robust security measures and
powerful fraud prevention tools.

• **End-to-End Support** : Receive comprehensive support throughout setup,
operation, and growth from EdfaPay experts.

• **Focus on Your Business** : We handle the technology and complexities of
payment systems, so you can concentrate on your core business and customers.

##

Features and Capabilities

Unlock a full suite of advanced payment capabilities under your own brand.
EdfaPay White Label Solutions equip you with everything needed to manage
merchants, scale faster, and keep transactions secure.

Business Models & Hosting Options

Select the model that fits your business — quick, turnkey deployment on
EdfaPay infrastructure or complete autonomy on your own infrastructure.

SoftPOS (Tap-to-Pay) and Payment Gateway

Turn any NFC-enabled mobile device into a secure payment terminal. With
EdfaPay's SoftPOS solution, your merchants can accept card and digital wallet
payments without extra hardware — a flexible, cost-effective way to handle in-
store or on-the-go transactions. The gateway supports local (MADA) and
international cards (VISA, MasterCard), e-wallets, digital wallets, and
multiple currencies for a seamless customer experience.

Comprehensive Payment Features

EdfaPay White Label Solutions provide a robust suite of advanced features
including:

  * Multi-payment gateway support
  * Automated payouts
  * Subscription billing
  * Advanced fraud protection

These tools are designed to help you manage merchants, scale faster, and
ensure transaction security, all under your own brand.

##

Target Segments

EdfaPay White Label Solutions are ideal for a diverse range of businesses
looking to enhance their payment offerings.

Financial Institutions

Banks, credit unions, and other financial entities.

POS Service Providers

Companies offering Point-of-Sale hardware and software.

SaaS Companies

Software-as-a-Service providers integrating payment solutions.

Healthcare Providers

Healthcare organizations needing secure and efficient payment processing.

E-commerce Platforms

Online marketplaces and retailers for streamlined transactions.

Government Entities

Public sector organizations requiring robust payment systems.

##

The Implementation Process

EdfaPay supports you end-to-end through a straightforward implementation
journey:

Implementation Steps

  1. **Agreement & KYC**: Initial setup and Know Your Customer procedures.
  2. **Customization** : Tailoring the platform to your brand and specific needs.
  3. **Onboarding** : Integrating your merchants and services onto the platform.
  4. **Training** : Ensuring your team is proficient with the new system.
  5. **Go-Live Launch** : Officially launching your branded payment service.

##

Your Brand, Your Services, Your Dashboard

EdfaPay White Label Solutions put you in full control. Build a payment
experience that reflects your own identity — from your logo and brand colors
to the services you offer and the merchants you manage. With a fully
customizable dashboard, you can oversee your merchants, configure selected
services, and enable features like split and payout while keeping everything
under your own brand.

##

Why Start Now?

Stay ahead of the competition, boost customer loyalty, and scale faster with
EdfaPay White Label Solutions. Leverage our expertise to quickly enter new
markets and differentiate your offerings.

##

Let's Get Started

Ready to launch your own branded payment platform? Contact us today to discuss
your requirements and discover how EdfaPay White Label Solutions can transform
your payment experience.

Updated 3 months ago

Edfapay Partner

Partner Configuration Requirements

Ask AI



--- URL: https://docs.edfapay.com/docs/copy-of-plugin-installation ---

#

Plugin Download

Download the latest version of the Edfapay plugin from the official
repository: Edfapay Plugin.

#

System Requirements

To ensure smooth operation of the EdfaPay WooCommerce Plugin, your environment
must meet the following requirements:

  * **WooCommerce:** Version 3.0.9 or higher (compatible with the latest versions).
  * **WordPress:** Version 4.4 or higher.
  * **PHP:** Versions 5.6 – 8.2. (You can verify your PHP version by navigating to `WooCommerce` → `Status` in your WordPress dashboard).
  * **SSL Certificate:** An active SSL certificate is required for secure transaction processing.
  * **EdfaPay Merchant Account:** A valid and active EdfaPay merchant account.
  * **EdfaPay WooCommerce Plugin:** The EdfaPay WooCommerce Plugin must be installed on your WordPress site (this will be covered in the installation steps).

#

Step-by-Step Installation

Follow these steps to install the EdfaPay WooCommerce extension:

  1. From your WordPress Admin Dashboard, navigate to `Plugins` -> `Add New`.

  2. Click the `Upload Plugin` button.

  3. Click `Browse` to select the EdfaPay plugin `.zip` file from your computer, then click `Install Now`.

  4. Once the plugin is successfully uploaded, go to the `Plugins` page. Locate `EdfaPay Payment Gateway` and click `Activate` to enable it.

  5. After activation, navigate to `WooCommerce` → `Settings` → `Payments` to find "EdfaPay" listed among the payment methods.

  6. Click on "EdfaPay" to access its settings page.

> 📘
>
> **Note**
>
> Configuration of credentials and payment behavior will be covered in the
> next section.

Updated 13 days ago

WooCommerce Integration with EdfaPay

Plugin Settings for EdfaPay WooCommerce

Ask AI



--- URL: https://docs.edfapay.com/docs/copy-of-woocommerce ---

EdfaPay offers seamless integration with WooCommerce, the popular eCommerce
platform for WordPress. This section provides a comprehensive overview of the
EdfaPay WooCommerce integration process, guiding merchants through various
setup options to securely accept online payments.

###

Explore the Main Integration Categories:

Plugin Installation

Follow step-by-step instructions to install and configure the EdfaPay
WooCommerce plugin on your store. This is the foundational step for any
integration.

Plugin Settings

Set up your store with ease, redirecting customers to EdfaPay’s secure hosted
page for quick and secure payment processing.

Each section includes practical guidance, configuration examples, and helpful
notes to ensure a smooth integration experience.

Updated 13 days ago

Authentication

Plugin Installation

Ask AI



--- URL: https://docs.edfapay.com/docs/cs-cart ---

EdfaPay provides a secure payment gateway integration for CS-Cart. You can
download the plugin from our public repository and follow the steps below to
install and configure it.

###

Source Files

The CS-Cart EdfaPay plugin is available here: CS-Cart

###

Installation Steps

  1. Navigate to Add-ons In your CS-Cart Admin Panel go to: Add-ons > Manage add-ons > Manual installation

  2. In the opened pop-up window select the add-on file. Upload a file in zip format from the local computer (Local)

  3. **Activate Edfapay** After installation, you should see EdfaPay listed in your add-ons. Make sure it is activated.

  4. **Set Up Payment Method** Go to: Administration > Payment methods Select EdfaPay and click Edit.

  5. **Configure Processor** Set the processor to EdfaPay, then go to the Configuration tab.

  6. **Enter Credentials** Enter your Merchant Key and Password provided by EdfaPay and click Create.

###

Callback Configuration

Set the callback (notification) URL in your EdfaPay merchant dashboard using
this exact format:

    
    
    https://<your-cs-cart-website>/index.php?dispatch=payment_notification.return&payment=edfapay&act=callback

Updated 3 months ago

Plugin Settings for EdfaPay WooCommerce

Mobile SDKs

Ask AI



--- URL: https://docs.edfapay.com/docs/copy-of-checkout-integration ---

This section provides a clear, step-by-step guide for configuring Redirect
Checkout using the **EdfaPay WooCommerce plugin.** In this mode, customers are
redirected to EdfaPay’s secure payment page to complete their transactions.

###

Prerequisites

Before you begin, ensure the following prerequisites are met:

  * The plugin is installed and activated (see Plugin Installation).
  * You have LIVE API credentials from EdfaPay.
  * Your domain is SSL-enabled.

###

Steps to Configure Redirect Checkout

  1. Navigate to WooCommerce → Settings → Payments. Locate **EdfaPay **in the list of available payment methods.

  2. Click the “Manage” button next to the “EdfaPay” method to access its settings page.

  3. Complete the following required fields:

     * **Merchant Key**
     * **Merchant Password**
     * **Checkout Type** → https://api.edfapay.com
     * **Enable debug** → yes
  4. Copy the Webhook URL shown in the settings and go to your EdfaPay dashboard. Navigate to settings / callback URL and paste this URL.

  5. Save Changes. Once all settings are updated, scroll down and click the **Save changes** button.

**The following table describes all available configuration fields in the
EdfaPay WooCommerce plugin :**

Title| Value| Description  
---|---|---  
Enable/Disable| checked| Enables the EdfaPay payment method at checkout  
Front description| Text to be displayed on the payment page| Text to be
displayed on the payment page  
Description| Description to be displayed on the payment page| Description to
be displayed on the payment page  
Checkout host| https://api.edfapay.com| EdfaPay API host used for payment
redirection  
Payment method| Leave unselected| No specific payment method selection is
required  
Merchant key| `<your merchant key>`| Merchant identifier provided by EdfaPayy  
Merchant password| `<your merchant password>`| Merchant password provided by
EdfaPayy  
Enable debug| yes| Enables logging for troubleshooting and testing  
Hide icon on front| unchecked| Displays EdfaPay payment icons on the checkout
page  
Logo| Default (MADA, VISA, MasterCard)| Default card scheme logos displayed to
customers  
  
> ❗️
>
> Important Notes
>
>   * **Callback URL:** The Webhook URL shown in the EdfaPay plugin settings
> must be entered in your dashboard for proper transaction notifications. For
> detailed steps on how to configure the Callback (Webhook) URL in the EdfaPay
> dashboard, please refer to the following guide:
> https://docs.edfapay.com/update/docs/webhook-information
>   * **Checkout host:** Ensure the URL is entered exactly as shown
> (https://api.edfapay.com) and does not contain any extra spaces.
>

Updated 13 days ago

Plugin Installation

CS Cart

Ask AI



--- URL: https://docs.edfapay.com/docs/embedded-apple-pay-integration ---

###

Apple Pay (S2S) Integration – Overview

Apple Pay (Server-to-Server) integration enables merchants to process Apple
Pay transactions directly from their own backend systems. This method provides
full control and customization of the Apple Pay experience, allowing advanced
checkout flows, custom UI, and seamless user interactions.

Unlike the Embedded Integration (Checkout) approach — where EdfaPay handles
the Apple Pay button and session on behalf of the merchant — the S2S
integration requires merchants to handle everything from session creation to
payment processing. This includes domain verification, Apple certificates, and
secure transmission of Apple Pay tokens.

> 💡
>
> **Use Case** This integration is best suited for merchants who want to build
> a custom checkout experience on their website or mobile app, and have the
> technical resources to manage certificate handling and backend integration.

###

Integration Steps

To integrate Apple Pay S2S, you’ll need to:

  * Set up your Apple Merchant ID and certificates via your Apple Developer account.
  * Register and verify your domain with Apple.
  * Configure Apple Pay on MPGS (if you're using it).
  * Implement merchant validation and session generation.
  * Render Apple Pay button and process the payment request.

###

Integration Flow

Step 1: Customer Selection

Customer selects Apple Pay from your checkout page.

Step 2: Apple Pay Sheet

Apple Pay sheet opens (Safari/iOS/macOS).

Step 3: Token Generation

Apple generates a payment token after customer authorization.

Step 4: Frontend to Backend

Your frontend sends the token to your backend.

Step 5: Backend to EdfaPay API

Your backend calls EdfaPay S2S API with the Apple Pay token.

Step 6: Payment Processing

EdfaPay processes the payment with the issuer via MPGS.

Step 7: Status Return

Payment status is returned to your backend.

> **Production Only:** Apple Pay S2S cannot be tested in Sandbox. Domain
> verification is only valid for production domains.
>
> **Certificate Expiry:** The payment processing certificate expires annually
> — set reminders to renew before expiry to avoid downtime.
>
> **Safari Support:** On the web, Apple Pay works only in Safari; in mobile,
> it works only in iOS apps or Safari browser.

Updated 3 months ago

Apple Pay Configuration

Embedded Apple Pay— Configuration Guide

Ask AI



--- URL: https://docs.edfapay.com/docs/apple-pay-configuration ---

##

Apple Pay Configuration (Checkout Integration)

###

Overview

For merchants utilizing EdfaPay Checkout Integration, Apple Pay seamlessly
integrates without requiring additional technical steps. EdfaPay fully hosts
and configures Apple Pay, offering the following key advantages:

  * **No Apple Developer Account Required:** Eliminate the need for your own Apple Developer account.
  * **Zero Certificate or Domain Management:** EdfaPay handles all certificate and domain requirements.
  * **Automatic Availability:** Apple Pay becomes automatically available on supported devices once enabled by EdfaPay.

###

Core Benefits of This Setup

This integrated approach provides significant benefits:

  * **Effortless Integration:** No Apple Developer Account or complex certificate/domain setup.
  * **Rapid Onboarding:** Get Apple Pay up and running quickly.
  * **Enhanced Security & PCI Compliance:** Benefit from EdfaPay's secure and compliant environment.
  * **Optimized User Experience:** The Apple Pay button automatically appears in eligible scenarios for a frictionless checkout.

###

Configuration Steps

To activate Apple Pay within your checkout flow:

  1. **Merchant Onboarding:** Ensure your merchant account is fully onboarded and approved by the EdfaPay team.
  2. **Integration Type Verification:** Confirm you are using the `edfapayWithCardDetails` Checkout Integration.
  3. **Activation Request:** Contact the EdfaPay Integration Support Team to formally request Apple Pay activation. Our team will enable Apple Pay for your account and notify you upon completion.

###

Apple Pay Button Behavior

Once activated, the Apple Pay button exhibits the following behavior:

  * **Automatic Display:** It will automatically appear for customers using Safari on compatible Apple devices.
  * **Production Mode Only:** The button is exclusively visible in production environments.
  * **Zero Client-Side Changes:** No modifications are required on your end; the button is an integral part of the hosted checkout.

> **No Implementation Required:** Displaying the Apple Pay button requires no
> additional implementation from your side; EdfaPay manages this entirely.

###

Apple Pay Testing Limitations

> ❗️
>
> **Apple Pay Button Not Available in Test Mode:** The Apple Pay button will
> not appear in sandbox/testing environments. To view and utilize the Apple
> Pay button, your merchant account must be live in production with Apple Pay
> enabled by EdfaPay.

> **Attempting to view the button while your account is in sandbox/testing
> mode will result in its absence, even on supported devices.**

###

Important Considerations

> 📘
>
> **Device Sensitivity:** The Apple Pay button is device-sensitive and will
> only appear to eligible customers based on their device, browser, and Apple
> Wallet configuration.

> 👍
>
> **S2S Integration Requirement:** If you plan to transition to S2S
> Integration, a full re-implementation of Apple Pay will be necessary,
> including your own domain registration and Apple certificates.

Updated 3 months ago

Overview

Embedded Apple Pay Integration

Ask AI



--- URL: https://docs.edfapay.com/docs/edfapay-production-dashboard ---

The EdfaPay SoftPOS Production Dashboard is your central hub for monitoring
live transactions, configuring terminals, managing users, and generating
reports — all from one unified platform.

###

Dashboard Overview

Upon logging into the dashboard:

  * **Key Metrics** : Purchases, Refunds, Revenue, Reversals, and Active Terminals.
  * **Interactive payment charts** : Real-time charts that visualize transaction volumes, refunds, and reversals to help you track trends and performance.
  * **Customizable Widgets** : Tailor the overview to focus on the data most relevant to your operations.

###

Key Features of the Dashboard

The SoftPOS Dashboard provides a comprehensive suite of tools to support your
business:

Feature| Description  
---|---  
**Transactions**|  Monitor all live transactions in real time, with search and
filtering by order ID, status, or date.  
**Reports**|  Generate and export detailed reports, apply custom filters, and
access saved reports for future use.  
**Branches**|  Create and manage multiple merchant branches under a single
account.  
**Users**|  Add, edit, or remove users and assign roles with tailored access
permissions.  
**Terminals**|  Register and manage SoftPOS terminals, including bulk uploads
via Excel templates for scale.  
**Analytics**|  Access visual insights on payment activity to identify growth
patterns and monitor business health.  
**Reconciliation**|  Review reconciliation records for streamlined financial
balancing.  
  
###

Dashboard User Guides

To support your use of the EdfaPay SoftPOS Production Dashboard, we provide a
comprehensive user guide in English. The guide includes step-by-step
instructions, screenshots, and templates to help you maximize the dashboard’s
features.

Language| Download Link  
---|---  
**English**| SoftPOS Dashboard Guide  
  
> These guides provide detailed instructions on how to:
>
>   * Navigate and customize the Dashboard Overview
>   * Generate, save, and download custom reports
>   * Manage transactions and perform reconciliations
>   * Add and configure branches, users, and terminals
>   * Upload multiple terminals using the Excel template
>   * Update account and profile settings
>

> 🚧
>
> Important Notes for Production Environment
>
>   * The Production Dashboard reflects real financial data. Always exercise
> caution when making changes.
>   * Updates to settings (e.g., adding terminals, editing users, or changing
> configurations) are effective immediately.
>   * Credentials and configurations used in production cannot be applied to
> any sandbox or testing environment.
>

Updated 3 months ago

Production Environment

Partner

Ask AI



--- URL: https://docs.edfapay.com/docs/edfapay-refund-integration ---

##

Refund Overview

The EdfaPay Refund Integration provides a secure and reliable way for
merchants to return funds to customers for previously successful transactions.
Refunds are processed in accordance with card scheme rules and banking
regulations, ensuring transparency and clear tracking throughout the refund
lifecycle.

This integration supports both full and partial refunds and is designed for
platforms that require controlled and predictable refund handling.

###

Core Capabilities

EdfaPay’s Refund Integration enables merchants to:

  * Submit refund requests for successful transactions
  * Process both full and partial refunds
  * Track refund status through EdfaPay
  * Manage bank-dependent refund timelines

###

Refund Types Comparison

Refund Type| Description| Use Case  
---|---|---  
Full Refund| Returns the entire amount of a previously successful
transaction.| Order cancellations or full reversals.  
Partial Refund| Returns a specific portion of the original transaction
amount.| Partial order adjustments or item returns.  
  
###

Refund Options

####

Checkout Integration Refunds

Checkout – Full Refund

Returns the full amount of a previously successful checkout transaction. Used
when an order is fully canceled after payment completion.

Checkout – Partial Refund

Returns part of the original checkout transaction amount. Useful for partial
cancellations, item returns, or order adjustments.

####

Server-to-Server (S2S) Integration Refunds

S2S – Full Refund

Reverses the entire captured amount of a successful Server-to-Server
transaction programmatically.

S2S – Partial Refund

Refunds a specific amount from the original S2S transaction. Multiple partial
refunds may be supported as long as the total does not exceed the captured
amount.

###

How Refunds Work in EdfaPay

EdfaPay handles refund requests by validating them, forwarding them to the
banking network, and tracking their status until completion or rejection.

Refund handling sequence:

  1. The merchant submits a refund request.
  2. EdfaPay validates and accepts the request.
  3. The refund request is forwarded to the acquiring bank.
  4. The issuing bank processes the refund.
  5. The refunded amount is credited back to the customer based on bank timelines.

Once a refund is accepted by EdfaPay, final completion depends on the issuing
bank.

###

Banking Roles in Refund Processing

**Acquiring Bank** The merchant’s bank that receives refund requests from
EdfaPay and routes them through the card network.

**Issuing Bank** The customer’s bank that issued the card and is responsible
for crediting the refunded amount back to the customer’s account.

###

When a Refund Is Sent to the Bank

A refund is considered sent to the bank when EdfaPay returns a successful
refund response to the merchant.

At this stage:

  * The refund request has been accepted by EdfaPay
  * The request has been forwarded to the acquiring bank
  * Final settlement depends on issuing bank processing

A successful response does not indicate that the funds have already reached
the customer.

###

Refund Timelines

Refund timelines are determined by the issuing bank and the applicable card
scheme.

Typical processing times range from 7 to 14 business days, depending on:

  * Issuing bank policies
  * Card network rules
  * Local banking regulations

EdfaPay does not control or expedite refund posting once the refund is sent to
the bank.

> 🚧
>
> **Important Considerations**
>
>   * Refunds can only be initiated for successful transactions.
>   * A successful refund response from EdfaPay confirms acceptance, not final
> settlement.
>   * Refund completion timelines are fully dependent on the issuing bank.
>   * Partial refunds may be subject to amount, frequency, or configuration
> limitations.
>

> ❗️
>
> **When to Contact the Customer’s Bank**
>
> Merchants should ask customers to contact their issuing bank when:
>
>   * The refund status is successful in EdfaPay.
>   * The expected refund timeline has passed.
>   * The refunded amount is not visible on the customer’s statement.
>

>
> In these cases, the delay is typically bank-side.

> 📘
>
> **When to Contact EdfaPay Support**
>
> Merchants should contact EdfaPay Support when:
>
>   * The refund request is rejected or fails.
>   * The refund does not appear in EdfaPay transaction records.
>   * There is a mismatch between the refund amount and the original
> transaction.
>   * A technical issue occurs during refund submission.
>

Updated 27 days ago

Extra Amount Feature

Testing Guide

Ask AI



--- URL: https://docs.edfapay.com/docs/authentication ---

All requests to EdfaPay APIs require secure authentication using a hash-based
mechanism to validate request origin and ensure data integrity. EdfaPay
employs a shared-secret hashing method for high security.

###

How Authentication Works

Authentication involves generating a hash using key fields and your merchant
secret password. This hash is sent with the API request for data integrity and
authenticity validation.

###

Hash Generation Logic

To generate the hash:

**Required Fields:**

  * `payer_email`: Customer's email address
  * `card_number`: Customer’s card (PAN) - use first 6 digits + last 4 digits only.
  * `password`: Secret hash password provided by EdfaPay.

**Hash Formula:**

    
    
    HASH = MD5( UPPERCASE( Reverse(payer_email) + password + Reverse(first6PAN + last4PAN) ) )

**Example - JavaScript Hash Generation**

JavaScript

    
    
    const password = "YOUR_SECRET_HASH_PASSWORD";
    const email = "customer@email.com";
    const cardNumber = "5123456789012346"; // Full card number
    const reverse = str => [...str].reverse().join('');
    const baseString = reverse(email) + password + reverse(cardNumber.slice(0, 6) + cardNumber.slice(-4));
    const finalHash = CryptoJS.MD5(baseString.toUpperCase()).toString();
    console.log("Generated Hash:", finalHash);

> 📘
>
> **Note:** Use CryptoJS.MD5 or a similar MD5 hashing utility in your backend
> language.

###

Sending the Hash

Include the generated hash in your request as a field named `hash`.

    
    
    --form 'hash="e3aab9d93e1b43a0a872bd8442f76c01"'

###

Authentication & Security Best Practices

Practice| Description  
---|---  
**Hash Server-side**|  Always generate the hash on the **server** , never
client-side.  
**Use HTTPS**|  All API endpoints require HTTPS; HTTP requests will be
blocked.  
**Keep Secret Password Safe**|  Do not hardcode your password; store it in
secure environment variables.  
**Limit IPs (if applicable)**|  Optionally restrict access to known IPs
(contact support).  
**Monitor Activity**|  Track unusual transaction volume or failed hash
verifications.  
**Secure Webhooks**|  Validate incoming hashes on webhook responses to verify
authenticity.  
  
> ❗️
>
> The hash in the request payload is used solely to ensure the integrity of
> the request and is **not related** to the hash included in webhook
> notifications.
>
> For validating webhook notifications, please refer to **Webhook
> Validation**.

###

Authentication Request Possible Errors

Error Code| Message| Cause| Action  
---|---|---|---  
`AUTH_HASH_MISSING`| Hash value is missing| The `hash` field was not sent.|
Ensure hash is included in request.  
`AUTH_HASH_INVALID`| Hash mismatch| Incorrect hash, wrong password, or
incorrect fields.| Regenerate hash and check all values.  
`MERCHANT_DISABLED`| Merchant account is disabled| Your EdfaPay account is not
active.| Contact support.  
`INVALID_CLIENT_KEY`| Invalid client key| Wrong `client_key` or malformed
value.| Verify `client_key` is correct.  
`UNSECURE_CONNECTION`| Request not over HTTPS| Request sent via HTTP.| Always
use HTTPS endpoints.  
  
> ❗️
>
> **Important Notes:**
>
>   * Include a valid hash in every payment-related request (SALE, AUTH,
> RECURRING, etc.).
>   * The full card number is only used during hash generation, not sent with
> the final payload.
>   * If the hash does not match on the server, the request will be rejected
> immediately.
>

Updated about 1 month ago

Webhook Validation

Plugins

Ask AI



--- URL: https://docs.edfapay.com/docs/apple-paytroubleshooting-error-codes ---

This section provides a comprehensive guide to common issues and error codes
encountered during Apple Pay integration (Server-to-Server). For unlisted
issues, please contact EdfaPay Integration Support.

###

Common Troubleshooting Scenarios

The table below outlines frequent integration challenges, their potential
causes, and actionable solutions.

Issue| Possible Cause| Solution  
---|---|---  
Apple Pay button not visible|

  * Apple Pay JS API not loaded
  * Merchant domain not verified with Apple
  * Device/browser not supporting Apple Pay

|

  1. Verify Apple Pay support on the test device (Safari, iOS/macOS).
  2. Ensure domain verification with Apple is complete.
  3. Confirm correct loading of the Apple Pay JS script.

  
Payment not completed error|

  * Payment token not generated
  * Apple Merchant ID mismatch
  * Frontend not sending correct token

|

  1. Ensure `merchantIdentifier` accurately matches your Apple Merchant ID.
  2. Thoroughly debug the `onpaymentauthorized` event.
  3. Log and verify the token object before transmitting it to the backend.

  
Hash Mismatch / Invalid Hash|

  * Incorrect parameters used in hash generation
  * Incorrect parameter order
  * Password/key mismatch

|

  1. Adhere strictly to the hash generation formula.
  2. Verify no extra spaces or encoding issues are present.
  3. Use the same `password` and `identifier` configured in EdfaPay.

  
400 Bad Request API status|

  * Missing required parameters
  * Incorrect parameter name or format

|

  1. Cross-reference the request body against the official documentation.
  2. Ensure the JSON object is valid and properly escaped.

  
500 Internal Server Error API status|

  * Invalid Apple Pay payment token structure
  * Gateway processing error

|

  1. Verify that `parameters` contains a valid Apple Pay token object.
  2. Contact EdfaPay support with the complete request/response log.

  
  
###

Apple Pay Error Codes

This table lists common Apple Pay error codes, their meanings, and recommended
actions.

Error Code| Meaning| Suggested Action  
---|---|---  
`ERR_INVALID_HASH`| Generated hash does not match server calculation| Recheck
hash generation logic and parameter order.  
`ERR_INVALID_IDENTIFIER`| Apple Merchant Identifier is invalid or
unregistered| Use the correct Apple Merchant ID configured in your Apple
Developer account.  
`ERR_PAYMENT_TOKEN_INVALID`| Apple Pay token is malformed or expired| Ensure
the token is freshly captured from the frontend and passed as a JSON string.  
`ERR_UNSUPPORTED_CURRENCY`| Currency is not supported for Apple Pay| Use a
supported currency (e.g., SAR).  
`ERR_TRANSACTION_DECLINED`| Issuer declined the transaction| Suggest the
customer try another card or payment method.  
`ERR_PARAMETER_MISSING`| A required parameter is missing from the request|
Review the request body and include all necessary fields.  
`ERR_APPLE_PAY_NOT_ENABLED`| Apple Pay is not activated for this merchant|
Contact EdfaPay to enable Apple Pay on your account.  
  
> 💡
>
> **Important Notes:**
>
>   * Always log the error code and message for support reference.
>   * A "pending" status does not guarantee success; confirm via the Status
> API.
>   * Token-related errors (e.g., 200.300.xxx) often indicate an expired Apple
> Pay session.
>

Updated 3 months ago

Embedded Apple Pay — Implementation & Go-Live

Webhook

Ask AI



--- URL: https://docs.edfapay.com/docs/3d-secure ---

EdfaPay supports 3D Secure (3DS) authentication to provide an additional layer
of protection for online card transactions. This feature helps reduce fraud
and meet compliance requirements such as SCA (Strong Customer Authentication)
under PSD2. Currently, 3DS is available in test mode to allow merchants to
simulate the flow and integration.

> 🚧
>
> Note This page is shown only in test mode. In live mode, the actual 3DS page
> is rendered by the card issuer and may differ in appearance.

###

What is 3D Secure?

3D Secure is an authentication protocol used to confirm a cardholder’s
identity during online payments. When 3DS is triggered, the cardholder is
prompted to complete an extra verification step—such as entering a one-time
password (OTP), confirming via biometric ID, or using a bank-provided code.

Popular brandings of 3DS include:

  * Visa Secure

  * Mastercard Identity Check

  * American Express SafeKey

###

Testing 3DS

3DS flows can currently be tested in test mode using supported test cards.
This helps ensure your integration behaves correctly when 3DS is triggered in
production.

> 🚧
>
> The image below shows the test-mode simulation pages for authentication
> during payment processing:
>
>   * Left side: 3D Secure (3DS) Test Page – This page appears on test mode
> only and is designed to simulate the 3DS challenge flow, where a cardholder
> would typically verify their identity via their bank.
>   * Right side: OTP Test Page – Also in test mode, this screen simulates an
> OTP (One-Time Password) entry step. It appears during S2S test transactions
> to represent user confirmation.
>

Updated 3 months ago

Transaction Decline Codes

FAQS

Ask AI



--- URL: https://docs.edfapay.com/docs/e-invoice-system ---

###

E-Invoice System Overview

The E-Invoice system in your dashboard simplifies the process of creating and
sending invoices to your customers. It features two primary sections:

  * **Create Invoice:** for generating and sending new invoices.
  * **Invoice History:** for tracking, filtering, and managing existing invoices.

> 👉
>
> No API integration is required – all operations are managed directly within
> the Dashboard.

###

Create E-Invoice

The **Create E-Invoice** screen presents a form where you input customer and
invoice details.

####

Customer Information

The following table outlines the customer details required for invoice
creation:

Field| Requirement| Description  
---|---|---  
**Customer Name**|  Required| Full name of the customer.  
**Customer Email**|  Required| The email address where the invoice will be
sent.  
**City**|  Required| Customer’s city.  
**Customer Address**|  Required| Full billing address.  
**Customer VAT**|  Optional| Customer’s VAT ID (if applicable).  
**Send by**|  Required| Choose the method to send the invoice (e.g., Email,
SMS).  
**Mobile Number**|  Required| Customer’s mobile number (prefilled with +966
for KSA).  
  
####

Invoice Summary (Right Panel)

This section automatically calculates invoice totals:

Summary Item| Description  
---|---  
**Total Items**|  The total number of products or services.  
**Subtotal (without VAT)**|  Sum of items before tax is applied.  
**VAT amount**|  Tax calculated based on the VAT percentage.  
**Subtotal (with VAT)**|  Total sum including VAT.  
**Shipping**|  Any applicable shipping charges.  
**Discount**|  Any applied discount.  
**Grand Total**|  The final amount due for payment.  
  
####

Invoice Items

Click **\+ Add new item** to include products or services. Each item requires
the following details:

  * **Product Name / Product Description:** Name or description of the product or service.
  * **Quantity:** Number of units.
  * **Discount:** Any discount applied to the item.
  * **Unit Price:** Price per unit.
  * **Price:** Total price for the item (Quantity x Unit Price - Discount).

> 📘
>
> You can add multiple products to a single invoice.

####

Additional Invoice Options

Option| Description  
---|---  
**Description**|  Add extra notes, e.g., “Tax invoice for online purchase.”  
**Shipping charge**|  Enter delivery fees if applicable.  
**VAT (%)**|  Enter the VAT percentage (defaults to 0 if not applicable).  
**Discount (SAR)**|  Enter any discount value to apply.  
  
####

Final Step

Once all fields are completed:

  * **Click Save and Send:** The invoice will be generated and automatically sent to the customer.
  * **Click Reset:** Clears the form to start over.

###

Invoice Details

Once an invoice is created and sent, merchants can view its full details
inside the dashboard. This section provides all the information about the
transaction, seller, buyer, and totals.

General Information

Basic details of the invoice, including invoice number, creation date, and
time.

Seller Information

Information about the merchant issuing the invoice (name, email, phone number,
address, VAT ID).

Buyer (Payer) Information

Details of the customer who will receive and pay the invoice (name, email,
phone number, address, VAT ID).

Product / Item Details

List of items or services included in the invoice, showing unit price,
quantity, and total amounts.

Invoice Totals

A summary section displaying subtotal, VAT value, shipping charges, discounts,
and the grand total.

Actions

Options for refreshing or managing the invoice (e.g., resend invoice, download
copy).

> 📘
>
> **Note** If the customer completes payment via the invoice link, the status
> in Invoice History will automatically update. Merchants can resend the
> invoice to the customer from Invoice History → Actions.

###

E-Invoice History

The **E-Invoice List** section allows merchants to view and manage all
previously created invoices.

####

Filter Options

Filter Option| Description  
---|---  
**Invoice Date**|  Search invoices by a specific date range.  
**Invoice ID**|  Search using a unique invoice reference.  
**Customer Name / Mobile**|  Filter invoices by customer name or mobile
number.  
**Invoice Status**|  Filter by payment status (e.g., Pending, Paid,
Cancelled).  
  
####

Invoice Table Columns

Column Name| Description  
---|---  
**Invoice ID**|  Unique reference for each invoice.  
**Customer**|  Name of the customer.  
**Email**|  Customer’s email address.  
**Mobile Number**|  Customer’s phone number.  
**VAT ID**|  Customer VAT number (if provided).  
**Send By**|  Method of delivery (Email / SMS).  
**Payment Status**|  Indicates if the invoice is Paid, Pending, or Failed.  
**Amount**|  Total amount of the invoice.  
**Status**|  Current state of the invoice (e.g., Active, Cancelled).  
**Date-Time**|  Timestamp when the invoice was created.  
**Notification Status**|  Indicates whether the customer was notified.  
**Actions**|  Options to manage the invoice (view, resend, cancel).  
**Show Invoice**|  View detailed invoice information.  
  
##

Dashboard User Guides

To help you effectively navigate and utilize the EdfaPay E-Invoice System,
detailed user guides are available in both English and Arabic. These resources
provide step-by-step instructions on creating, managing, and tracking invoices
within your dashboard.

Language| Download Link  
---|---  
**English**| Dashboard Guide  
**Arabic**| دليل لوحة التحكم  
  
> 🚧
>
> **Tip for Merchants:** Invoices are automatically linked with your
> transactions in EdfaPay. When the customer completes payment, the invoice
> status will automatically update in Invoice History.
>
> Once an invoice is **cancelled** , it can no longer be opened, copied, or
> accessed through its public link. If anyone attempts to open a cancelled
> invoice in a browser, an error message will appear indicating that the
> invoice has been cancelled.

Updated 3 months ago

Payment Methods

Overview

Ask AI



--- URL: https://docs.edfapay.com/docs/edfapay-sandbox-dashboard ---

#

EdfaPay Sandbox Dashboard

EdfaPay sandbox is a simulation environment mirroring the live system,
enabling merchants to test all integration types—checkout, hosted, and
S2S—securely with test credentials and data.

##

Sandbox Login Credentials

To access the EdfaPay Sandbox Dashboard, please use the following credentials:

Credential| Value  
---|---  
**URL**| Sandbox  
**OTP (One-Time Password)**| `111111`  
  
> Note: The One-Time Password (OTP) is fixed for the sandbox environment and
> can be utilized at any time.

##

Key Features of the Dashboard

The EdfaPay Sandbox Dashboard offers a comprehensive suite of features
designed to empower your payment operations:

Feature| Description  
---|---  
**Transactions**|  View and search all live transactions by order ID, status,
or date.  
**Reports**|  Export detailed transaction reports in various formats for
reconciliation.  
**Merchants**|  Manage your merchant profile information and account
credentials.  
**Settings**|  Configure critical parameters like callback URLs,
success/failure URLs, and notification emails.You will also find your API Key,
which includes your Merchant ID and Merchant Password, used to authenticate
your integration with EdfaPay’s API.  
**Payment Methods**|  View available payment methods and request their
activation.  
**Invoices**|  Issue and manage payment invoices directly through the
dashboard.  
  
##

Dashboard User Guides

To facilitate your effective navigation and utilization of the EdfaPay Sandbox
Dashboard, comprehensive user guides are available for download in both
English and Arabic. These resources provide detailed instructions on key
functionalities:

Language| Download Link  
---|---  
**English**| Dashboard Guide  
**Arabic**| دليل لوحة التحكم  
  
> These guides provide detailed instructions on how to:
>
>   * Manage transactions efficiently
>   * View and export comprehensive reports
>   * Issue and track invoices
>   * Update crucial settings (e.g., callback URLs, notification emails)
>   * Manage your merchant account profile
>

Updated 3 months ago

SandBox Environment

Production Environment

Ask AI



--- URL: https://docs.edfapay.com/docs/embedded-apple-pay-configuration-guide ---

This guide provides comprehensive instructions for integrating Apple Pay with
EdfaPay via our Embedded (Server-to-Server) solution. Adhering to these steps
will facilitate a seamless and successful activation, enabling your business
to efficiently process Apple Pay transactions.

###

1\. Apple Developer Account Setup

To commence, an active Apple Developer Account is required.

  * Access the Apple Developer Portal and authenticate with your Apple ID.

> 💡
>
> **Prerequisite:** A paid Apple Developer Account is mandatory for proceeding
> with these configurations.

###

2\. Create a Merchant ID

A Merchant ID is fundamental for securely processing Apple Pay transactions.

  * Within the **Certificates, IDs & Profiles** section, select **Identifiers**.
  * Click the **+** button to add a new identifier.

  * Select **Merchant IDs** and click **Continue**.

  * Provide a descriptive name and a unique identifier (e.g., `merchant.yourcompanyname`).

  * Click **Register** to complete the creation process.

> 💡
>
> **Crucial Alignment:** The Merchant ID established here must precisely match
> the identifier configured within your MPGS and EdfaPay settings.

###

3\. Generate Payment Processing Certificate

This certificate facilitates secure payment processing for your Merchant ID.

  1. From your newly created Merchant ID, click **Edit**.
  2. Locate the **Apple Pay Payment Processing Certificate** section and click **Create Certificate**.

  1. Download the Certificate Signing Request (CSR) file from your MPGS account.
  2. Upload this CSR file to your Apple Developer account.

  1. Download the generated Apple Pay Payment Processing Certificate (a `.cer` file) from Apple.

> ❗️
>
> **MPGS Users - Essential Step:** For MPGS accounts, it is imperative to
> download the Certificate Signing Request (CSR) from the **Device Payment**
> section within MPGS. This CSR must then be uploaded to your Apple Developer
> account. Subsequently, download the resulting `.cer` file from Apple and re-
> upload it to MPGS. This iterative process is critical for correctly
> associating your Merchant Identifier.

> 📘
>
> **EdfaPay Support:** If you do not utilize an MPGS account, EdfaPay will
> supply the requisite CSR file. Please contact our Technical Support team at
> for assistance.

###

4\. Verify Your Merchant Domain

Domain verification is a critical prerequisite for enabling Apple Pay on your
website.

  1. Click **Add Domain**.

  1. Under **Domain Verification** , enter your production domain (e.g., `checkout.yourwebsite.com`).

  1. Download the unique verification file provided by Apple.
  2. Upload this file to the `/.well-known/` directory on your server (e.g., `https://yourdomain.com/.well-known/`).
  3. Return to Apple Developer and click **Verify**.

> 📘
>
> **File Placement:** Ensure the downloaded `well-known` file is accurately
> placed within the specified directory on your server for successful domain
> verification.

> ❗️
>
> **Production Environment Only:** Apple Pay domain verification is
> exclusively supported for production domains and will not function in
> staging or test environments.

###

5\. Apple Pay Payment Processing on the Web

To enable Apple Pay for web-based transactions using your Merchant ID, it is
necessary to register and verify all domains that will process payments.
Additionally, an Apple Pay Merchant Identity Certificate must be created to
authenticate your web sessions with Apple Pay processing servers.

**Apple Pay Merchant Identity Certificate Creation**

Execute the following steps to generate your Apple Pay Merchant Identity
Certificate:

  1. **Generate a CSR and Key File** Utilize the OpenSSL command below to create your Certificate Signing Request (`.csr`) and Private Key (`.key`) files:

Shell

         
         openssl req -new -newkey rsa:2048 -nodes -out merchantName_merchant.csr -keyout MerchantName_merchant.key -subj /CN=yourdomanName.com

  2.   3. **Convert the Certificate to PEM Format** After downloading the Apple-issued certificate (`.cer` file), convert it to a PEM (`.pem`) file using this command:

Shell

         
         openssl x509 -inform DER -in merchant_id.cer -out MerchantName_merchant_id.pem

  4. **Create a P12 File** Combine your generated PEM and Key files to create a P12 (`.p12`) file, a standard format for encapsulating private keys and X.509 certificates:

**In Mac use this command**

Shell

    
    
    $ openssl pkcs12 –export –in merchantName_merchant_id.pem -inkey merchantName_merchant.key -out apple-pay.p12 -name “apple” 

**In windows use this command**.

Shell

    
    
    openssl pkcs12 -export -in .\MerchantName_merchant_id.pem -inkey .\MerchantName_merchant.key -out apple-pay.p12 -name "apple"

> 🚧
>
> **Action Required: Submission of P12 File to EdfaPay**
>
> Upon successful generation of the `.p12` file, securely transmit the
> following details to EdfaPay:
>
>   * The generated `.p12` file.
>   * The password established for the `.p12` file.
>   * Your precise domain name.
>   * The name of your Apple Pay Merchant Identifier.
>

>
> This information is indispensable for EdfaPay to finalize the Apple Pay
> configuration on our payment gateway, thereby ensuring seamless processing
> of all your Apple Pay transactions.

> 📘
>
> **Important Considerations:**
>
>   * Ensure that `MerchantName` and `yourdomainname.com` are replaced with
> your specific merchant name and domain, respectively.
>   * Verify that filenames within each command precisely correspond to your
> generated files.
>   * The `.key` file must be safeguarded and never disclosed publicly.
>

> 🚧
>
> **Certificate Expiration:** Apple Pay certificates are subject to annual
> expiration. Prompt renewal prior to expiry is crucial to avert any service
> interruptions for Apple Pay transactions.

Updated 3 months ago

Embedded Apple Pay Integration

Embedded Apple Pay — Implementation & Go-Live

Ask AI



--- URL: https://docs.edfapay.com/docs/edfapay-production-dashboard-1 ---

#

EdfaPay Production Dashboard

######

The EdfaPay Production Dashboard is your central hub for managing live
transactions, monitoring payment statuses, accessing reports, and configuring
essential settings for your payment gateway.

##

Accessing the Production Dashboard

**URL:** Production Dashboard

To log in, use the production dashboard credentials provided to you during the
onboarding process. If you have not yet received your credentials, please
contact our Operations Team at: onboarding@edfapay.com.

##

Critical Credentials for API Integration

Before you begin integrating with the EdfaPay Payment Platform API, you must
obtain the following essential credentials from your administrator or
operations team. These credentials are vital for authenticating your requests
and establishing secure communication with EdfaPay’s API.

**Data**| **Description**  
---|---  
**CLIENT_KEY**|  A unique identifier for your merchant account within the
Payment Platform, required in every API request. (Labeled as **Merchant Key**
in the Dashboard).  
**PASSWORD**|  Used for authenticating your API requests and calculating the
hash parameter for request security. (Labeled as **Password** in the
Dashboard).  
**PAYMENT_URL**|  The designated endpoint URL for sending payment requests to
the Payment Platform.  
  
##

Key Features of the Dashboard

The EdfaPay Production Dashboard offers a comprehensive suite of features
designed to empower your payment operations:

Feature| Description  
---|---  
**Transactions**|  View and search all live transactions by order ID, status,
or date.  
**Reports**|  Export detailed transaction reports in various formats for
reconciliation.  
**Merchants**|  Manage your merchant profile information and account
credentials.  
**Settings**|  Configure critical parameters like callback URLs,
success/failure URLs, and notification emails.You will also find your API Key,
which includes your Merchant ID and Merchant Password, used to authenticate
your integration with EdfaPay’s API.  
**Payment Methods**|  View available payment methods and request their
activation.  
**Invoices**|  Issue and manage payment invoices directly through the
dashboard.  
  
##

Dashboard User Guides

To facilitate your effective navigation and utilization of the EdfaPay
Production Dashboard, comprehensive user guides are available for download in
both English and Arabic. These resources provide detailed instructions on key
functionalities:

Language| Download Link  
---|---  
**English**| Dashboard Guide  
**Arabic**| دليل لوحة التحكم  
  
> These guides provide detailed instructions on how to:
>
>   * Manage transactions efficiently
>   * View and export comprehensive reports
>   * Issue and track invoices
>   * Update crucial settings (e.g., callback URLs, notification emails)
>   * Manage your merchant account profile
>

> 📘
>
> ###
>
> **Important Notes for Production Environment**
>
>   * The Production Dashboard processes and reflects **real financial data**.
> Exercise extreme caution when making any changes, especially to sensitive
> configurations like URLs and credentials.
>   * Any modifications made within the dashboard (e.g., updating callback
> URLs) are **immediately effective**.
>   * Credentials displayed or used in the production environment **cannot be
> used in sandbox or testing environments**. Always ensure you are using the
> correct credentials for the respective environment.
>

Updated 3 months ago

Production Environment

User Roles & Permissions

Ask AI



--- URL: https://docs.edfapay.com/docs/android ---

#

EdfaPay Payment Gateway Android SDK

EdfaPay is a white-label payment software provider. Thanks to our 15+ years of
experience in the payment industry, we’ve developed a state-of-the-art white-
label payment system that ensures smooth and uninterrupted payment flow for
merchants across industries.

EdfaPay Android SDK was developed and designed with one purpose: to help the
Android developers easily integrate the EdfaPay API Payment Platform for a
specific merchant.

##

Installation

> [!IMPORTANT]
>
> ###
>
> Configure Repository
>
> **Setup Android** Latest Version:
>
> Add the dependency to your project's `build.gradle` file:
>
> Groovy
>  
>  
>     dependencies {
>        ...
>        implementation 'com.github.edfapay:edfa-pg-android-sdk:$VERSION'
>      }
>
> To access and download the native dependency, ensure that the `jitpack`
> repository is configured. Add to `app/build.gradle`:
>
> Groovy
>  
>  
>     allprojects {
>       repositories {
>         ...
>         // Add below at the same location
>         maven {
>           url 'https://jitpack.io'
>         }
>       }
>     }
>
> Or add to `./settings.gradle`:
>
> Groovy
>  
>  
>     dependencyResolutionManagement {
>       repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
>       repositories {
>         ...
>         // Add below at the same location
>         maven {
>           url "https://jitpack.io"
>         }
>       }
>     }
>
> ###
>
> Configuring the Proguard Rule
>
> If your project is obfuscated with proguard, add the following rule to
> `proguard-rules.pro`:
>  
>  
>     -keep class com.edfapg.sdk.** {
>      public protected private *;
>     }

##

Usage

> [!IMPORTANT]
>
> ###
>
> Initialize SDK
>
> `MERCHANT_KEY`: Your Secret Merchant Key
>
> `MERCHANT_PASSWORD`: Your Secret Merchant Password
>
> `PAYMENT_URL`: Backend APIs URL//For Edfapay the URL is:
> https://api.edfapay.com/payment/post
>
> Kotlin
>  
>  
>       EdfaPgSdk.init(
>         this,
>         MERCHANT_KEY,
>         MERCHANT_PASSWORD,
>         PAYMENT_URL
>       )
>
> [!TIP]
>
> ###
>
> Get Ready for Payment
>

>> **Create`EdfaPgSaleOrder` Model**

>>

>> Kotlin

>>  
>>  
>>       val order = EdfaPgSaleOrder(

>>              id = UUID.randomUUID().toString(),

>>              amount = 1.00,

>>              currency = "SAR",

>>              description = "Test Order"

>>              );

>>

>> **Create`EdfaPgPayer` Model**

>>

>> Kotlin

>>  
>>  
>>       val payer = EdfaPgPayer(

>>         firstName = "First Name",

>>         lastName = "Last Name",

>>         address = "EdfaPay Payment Gateway",

>>         country = "SA",

>>         city = "Riyadh",

>>         zip = "123768",

>>         email = "support@edapay.com",

>>         phone = "+966500409598",

>>         ip = "66.249.64.248",

>>         options = EdfaPgPayerOption( // Options

>>         middleName = "Middle Name",

>>         birthdate = DateTime.parse("1987-03-30"),

>>         address2 = "Usman Bin Affan",

>>         state = "Al Izdihar"

>>         )

>>       );

>>

>> **Payment with Card**

>>

>> EdfaPay offers three design options: `EdfaPayDesignType.one`,
`EdfaPayDesignType.two`, and `EdfaPayDesignType.three`. Select the desired
design and language (`EdfaPayLanguage.en` or ? `EdfaPayLanguage.ar`).

>>

>> Kotlin

>>  
>>  
>>     import com.edfapg.sdk.toolbox.EdfaPayDesignType

>>     import com.edfapg.sdk.toolbox.EdfaPayLanguage

>>       EdfaCardPay()

>>         .setOrder(order)

>>         .setPayer(payer)

>>         .setDesignType(EdfaPayDesignType.one)

>>         .setLanguage(EdfaPayLanguage.en)

>>         .onTransactionSuccess((response){

>>          print("onTransactionSuccess.response ===>
${response.toString()}");

>>                      }).onTransactionFailure((response){

>>                      print("onTransactionFailure.response ===>
${response.toString()}");

>>                      }).onError((error){

>>                      print("onError.response ===> ${error.toString()}");

>>                      }).initialize(this, onError = {}, onPresent = {})

>
> **Payment with Card Details**
>

>> Kotlin

>>  
>>  
>>     val card = EdfaPgCard(number = "5294069168715897",

>>                expireMonth = 3, expireYear = 2026, cvv = "049")

>>     EdfaPayWithCardDetails(this)

>>      .setOrder(order)

>>      .setPayer(payer)

>>      .setCard(card)

>>      .onTransactionFailure { res, data ->

>>                      print("$res $data")

>>                      Toast.makeText(this, "Transaction Failure",
Toast.LENGTH_LONG).show()

>>                      }.onTransactionSuccess { res, data ->

>>                      print("$res $data")

>>                      Toast.makeText(this, "Transaction Success",
Toast.LENGTH_LONG).show()

>>                      } .initialize(

>>                      onError = {

>>                      Toast.makeText(this, "onError $it",
Toast.LENGTH_LONG).show()

>>              },

>>                      onPresent = {

>>                      } )

>
> ###
>
> Addon's
>

>> **Create EdfaPgSaleOrder `&` EdfaPgPayer

>>

>> **Create`EdfaPgSaleOption` Model**

>>

>> Dart

>>  
>>  
>>       val saleOption = EdfaPgSaleOption(

>>         channelId = "channel-id-here", // channel-id if its enable for
merchant

>>         recurringInit = true // Make sure recurring is enabled for merchant
and [true=if want to do recurring, false=if don't want do recurring]

>>       )

>>

>> **Create`EdfaPgCard` Model**

>>

>> Dart

>>  
>>  
>>       val card = EdfaPgCard(

>>      number = "5294151606897978",

>>      expireMonth = 3,

>>      expireYear = 2026,

>>      cvv = "049"

>>      )

>>

>> **Sale Transaction** To process a sale transaction, pass `null` to
`options` and `false` to `auth`. For `termUrl3ds`, use:
https://pay.edfapay.com/

>>

>> Dart

>>  
>>  
>>      EdfaPgSdk.Adapter.SALE.execute(

>>      order = order,

>>      card = card,

>>      payer = payer,

>>      termUrl3ds = termUrl3ds,

>>      options = null,

>>      auth = false,

>>      callback = object : EdfaPgSaleCallback {

>>        override fun onResponse(response: EdfaPgSaleResponse) {

>>          super.onResponse(response)

>>          println(response.preattyPrint())

>>        }

>>        override fun onResult(result: EdfaPgSaleResult) {

>>          println(result.preattyPrint())

>>        }

>>        override fun onError(error: EdfaPgError) = Unit

>>        override fun onFailure(throwable: Throwable) {

>>          super.onFailure(throwable)

>>          println(throwable.preattyPrint())

>>        }

>>      }

>>     )  
>>

>> **Recurring Transaction**

>>

>>   * Make sure to pass false to `auth:`

>>   * Card Number should be passed the same used for the first `Sale` with
`EdfaPgSaleOption.recurringInit==true`

>>   * `EdfaPgRecurringOptions.firstTransactionId:` should `transactionId`
from first success `Sale` with `EdfaPgSaleOption.recurringInit==true`

>>   * `EdfaPgRecurringOptions.token:` Should be recurringToken from first
success `Sale` with `EdfaPgSaleOption.recurringInit==true`

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.Adapter.RECURRING_SALE.execute(

>>       order = order,

>>       options = recurringOptions,

>>       payerEmail = selectedTransaction.payerEmail,

>>       cardNumber = selectedTransaction.cardNumber,

>>       auth = false,

>>       callback = object : EdfaPgSaleCallback {

>>         override fun onResponse(response: EdfaPgSaleResponse) {

>>           super.onResponse(response)

>>          println(response.preattyPrint())

>>         }

>>  
>>         override fun onResult(result: EdfaPgSaleResult) {

>>           println(result.preattyPrint())

>>         }

>>  
>>         override fun onError(error: EdfaPgError) = Unit

>>  
>>         override fun onFailure(throwable: Throwable) {

>>           super.onFailure(throwable)

>>           println(throwable.preattyPrint())

>>         }

>>       }

>>     )

>>

>> **Capture Transaction**

>>

>>   * `transactionId:` You can take this `transactionId` from success `Sale`
with `auth:true`

>>   * Card Number should be passed the same used for the `Sale` with
`auth:true`

>>   * `cardNumber:` should authorized by `Sale` with `auth:true`

>>   * `amount:` should be the same as `Sale` with `auth:true`

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.Adapter.CAPTURE.execute(

>>       transactionId = selectedTransaction.id,

>>       payerEmail = selectedTransaction.payerEmail,

>>       cardNumber = selectedTransaction.cardNumber,

>>       amount = amount,

>>       callback = object : EdfaPgCaptureCallback {

>>         override fun onResponse(response: EdfaPgCaptureResponse) {

>>           super.onResponse(response)

>>          println(response.preattyPrint())

>>         }

>>  
>>         override fun onResult(result: EdfaPgCaptureResult) {

>>           println(result.preattyPrint())

>>         }

>>  
>>         override fun onError(error: EdfaPgError) = Unit

>>  
>>         override fun onFailure(throwable: Throwable) {

>>           super.onFailure(throwable)

>>           println(throwable.preattyPrint())

>>  
>>         }

>>       }

>>     )

>>

>> **Credit Void Transaction**

>>

>>   * `transactionId:` You can take this `transactionId` from success `Sale`
with `auth:true`

>>   * Card Number should be passed the same used for the `Sale` with
`auth:true`

>>   * `cardNumber:` should authorized by `Sale` with `auth:true`

>>   * `amount:` should be the same as `Sale` with `auth:true`

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.Adapter.CREDITVOID.execute(

>>       transactionId = selectedTransaction.id,

>>       payerEmail = selectedTransaction.payerEmail,

>>       cardNumber = selectedTransaction.cardNumber,

>>       amount = amount,

>>       callback = object : EdfaPgCreditvoidCallback {

>>         override fun onResponse(response: EdfaPgCreditvoidResponse) {

>>           super.onResponse(response)

>>          println(response.preattyPrint())

>>         }

>>  
>>         override fun onResult(result: EdfaPgCreditvoidResult) {

>>           println(result.preattyPrint())

>>         }

>>  
>>         override fun onError(error: EdfaPgError) = Unit

>>  
>>         override fun onFailure(throwable: Throwable) {

>>           super.onFailure(throwable)

>>           println(throwable.preattyPrint())

>>         }

>>       }

>>     )

>>

>> **Transaction Detail**

>>

>>   * `transactionId:` You can take this `transactionId` from the last
transaction,

>>   * `cardNumber:` should be passed the same used for the last transaction

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.Adapter.GET_TRANSACTION_DETAILS.execute(

>>       transactionId = selectedTransaction.id,

>>       payerEmail = selectedTransaction.payerEmail,

>>       cardNumber = selectedTransaction.cardNumber,

>>       callback = object : EdfaPgGetTransactionDetailsCallback {

>>         override fun onResponse(response:
EdfaPgGetTransactionDetailsResponse) {

>>           super.onResponse(response)

>>          println(response.preattyPrint())

>>         }

>>  
>>         override fun onResult(result: EdfaPgGetTransactionDetailsResult) {

>>           println(result.preattyPrint())

>>         }

>>  
>>         override fun onError(error: EdfaPgError) {

>>           println(error.preattyPrint())

>>         }

>>  
>>         override fun onFailure(throwable: Throwable) {

>>           super.onFailure(throwable)

>>           println(throwable.preattyPrint())

>>         }

>>       }

>>     )

>>

>> **Transaction Status**

>>

>>   * `transactionId:` You can take this `transactionId` from the last
transaction,

>>   * `cardNumber:` should be passed the same used for the last transaction

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.Adapter.GET_TRANSACTION_STATUS.execute(

>>       transactionId = selectedTransaction.id,

>>       payerEmail = selectedTransaction.payerEmail,

>>       cardNumber = selectedTransaction.cardNumber,

>>       callback = object : EdfaPgGetTransactionStatusCallback {

>>         override fun onResponse(response:
EdfaPgGetTransactionStatusResponse) {

>>           super.onResponse(response)

>>  
>>           println(response.preattyPrint())

>>         }

>>  
>>         override fun onResult(result: EdfaPgGetTransactionStatusResult) {

>>           println(result.preattyPrint())

>>         }

>>  
>>         override fun onError(error: EdfaPgError) {

>>           println(error.preattyPrint())

>>         }

>>  
>>         override fun onFailure(throwable: Throwable) {

>>           super.onFailure(throwable)

>>           println(throwable.preattyPrint())

>>  
>>         }

>>       }

>>     )

##

Getting help

To report a specific issue or feature request, open a new issue.

Or write a direct letter to the support@edfapay.sa.

##

License

MIT License. See the LICENSE file for more details.

##

Contacts

Website: https://edfapay.com/home/ Phone: +966920031242 Email:
support@edfapay.sa 7637 Othman Bin Affan St., 2123 Al Ezdihar Dist., 12487
Riyadh, Riyadh, Saudi Arabia

© 2022 - 2023 EdfaPay. All rights reserved.

Updated 3 months ago

IOS

Overview

Ask AI



--- URL: https://docs.edfapay.com/docs/extra-amount-feature ---

###

Overview

The **Extra Amount** feature allows partners to add additional fees to a
transaction directly from the dashboard. This feature is exclusive to partners
and does not affect the amount received by the merchant during payouts.

For example, platforms like TicketBy can use this feature to offer extra
services such as refund guarantees or WhatsApp reminders to customers. The
extra amount is collected from the customer but remains with the partner
rather than the merchant.

###

How It Works

  * **Extras Parameter:** A new `extras` parameter is added to the sale request.
  * **Structure:** Each extra is represented as an object with `type`, `name`, and `value`.

**Example:**

Example

    
    
    extras: [
     {"type":"AMOUNT","name":"WhatsApp Reminder","value":3},
     {"type":"AMOUNT","name":"Refund Guarantee","value":7}
    ]

> 📘
>
> **Customer Payment:** The customer pays the total amount, which includes the
> ticket price plus any extras.
>
> **Payout:** Only the original ticket price is sent to the merchant during
> payout. Extras remain with the partner.

###

Example Scenario

  * **Ticket price:** SAR 100
  * **Extra:** Refund Guarantee: SAR 10
  * **Total charged to customer:** SAR 110
  * **Merchant payout:** SAR 100
  * **Partner keeps:** SAR 10

###

Flutter SDK Implementation

Flutter

    
    
    final extras = [
     Extra(
      type: "AMOUNT",
      name: fee.nameEn,
      value: "$value",
     )
    ];
    EdfaCardPay()
      .setOrder(order)
      .setPayer(payer)
      .setExtras(extras)
      .setDesignType(EdfaPayDesignType.one)
      .setLanguage(EdfaPayLanguage.en);

###

API Example

API

    
    
    curl --location 'https://api.edfapay.com/payment/post' \
    --form 'client_key="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"' \
    --form 'order_id="TEST-XXXXXXXXXXX"' \
    --form 'hash="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"' \
    --form 'order_amount="0.11"' \
    --form 'card_number="XXXXXXXXXXXXXXXX"' \
    --form 'card_exp_month="XX"' \
    --form 'card_exp_year="XXXX"' \
    --form 'card_cvv2="XXX"' \
    --form 'payer_phone="+XXXXXXXXXXX"' \
    --form 'payer_country="SA"' \
    --form 'payer_address="XXXXXX@domain.com"' \
    --form 'action="SALE"' \
    --form 'payer_zip="XXXXXX"' \
    --form 'payer_ip="XXX.XX.XX.XXX"' \
    --form 'order_currency="SAR"' \
    --form 'payer_first_name="XXXXXX"' \
    --form 'payer_city="XXXXXX"' \
    --form 'auth="N"' \
    --form 'payer_last_name="XXXXXX"' \
    --form 'order_description="Test Order"' \
    --form 'payer_email="XXXXXX@domain.com"' \
    --form 'term_url_3ds="https://google.com/"' \
    --form 'recurring_init="N"' \
    --form 'req_token="N"' \
    --form 'extras="[{\"type\":\"AMOUNT\",\"name\":\"WhatsApp Reminder\",\"value\":\"3\"},{\"type\":\"AMOUNT\",\"name\":\"Refund Guarantee\",\"value\":\"7\"}]"'

**Hash Calculation**

To generate the hash parameter for the API request:

Hash

    
    
    var password = "XXXXXXXXXXXXXX";
    var cardNumber = "XXXXXXXXXXXXXXXX";
    var email = "XXXXXXXXX@domain.com";
    // Helper function to reverse a string
    const ReverseString = str => [...str].reverse().join('');
    // Combine reversed email + password + reversed first 6 + last 4 digits of card
    var final = (
      ReverseString(email) + 
      password + 
      ReverseString(cardNumber.substr(0, 6) + cardNumber.substr(-4))
    ).toUpperCase();
    // Generate MD5 hash
    var finalHash = CryptoJS.MD5(final).toString();
    console.log(finalHash);
    // Save the hash to Postman environment variable (if using Postman)
    postman.setEnvironmentVariable('operation_hash', finalHash);

> **Steps:**
>
>   1. Reverse the customer email.
>   2. Concatenate your merchant password.
>   3. Reverse the first 6 and last 4 digits of the card number and append.
>   4. Convert the string to uppercase.
>   5. Generate an MD5 hash of the final string.
>   6. Use this `finalHash` as the hash parameter in the API request.
>

###

Notes

  * The extras feature is exclusive to partners.
  * Extra amounts do not go to the merchant during payouts.
  * `type` should be "AMOUNT", and `value` represents the extra fee in the transaction currency.
  * Extras can include fees like SMS reminders, refund guarantees, or other partner-specific charges.

> ❗️
>
> **Note:** `type` should be "AMOUNT".

Updated 6 days ago

User Roles & Permissions

EdfaPay Refund Integration

Ask AI



--- URL: https://docs.edfapay.com/docs/flutter ---

#

EdfaPay Payment Gateway Flutter SDK

EdfaPay is a white-label payment software provider. Thanks to our 15+ years of
experience in the payment industry, we’ve developed a state-of-the-art white-
label payment system that ensures smooth and uninterrupted payment flow for
merchants across industries.

EdfaPay Flutter SDK was developed and designed with one purpose: to help the
Flutter developers easily integrate the EdfaPay API Payment Platform for a
specific merchant.

##

Installation

> [!IMPORTANT]
>
> ###
>
> Configure Repository
>
> This Flutter plugin is a wrapper of Android and iOS native libraries.
>
> **Setup Android**
>
> You must add the `jitpack` repository support to the **Gradle** to access
> and download the native dependency.
>
> Add below to the `./android/build.gradle` of your project
>
> Groovy
>  
>  
>     allprojects {
>       repositories {
>         ...
>         // Add below at the same location
>         maven {
>           url 'https://jitpack.io'
>         }
>       }
>     }
>
> Or add below to the `./android/settings.gradle` of your project
>
> Groovy
>  
>  
>     dependencyResolutionManagement {
>       repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
>       repositories {
>         ...
>         // Add below at the same location
>         maven {
>           url "https://jitpack.io"
>         }
>       }
>     }
>
> **Setup iOS**
>
> iOS does not require any setup just install Flutter plugin. If you need to
> enable `Apple Pay` in your app it can be enabled by following the
> instructions at Link
>
> [!IMPORTANT]
>
> ###
>
> Intalling Flutter Plugin
>
> In the `dependencies:` section of your `pubspec.yaml`, add the following
> lines:
>
> pubspec.yaml
>  
>  
>     dependencies:
>      intl: ^0.17.0
>      edfapg_sdk: any
>
> [!IMPORTANT]
>
> ###
>
> Configuring the Proguard Rule
>
> **Android**
>
> If your project is obfuscated with proguard, please add the rule below to
> your android project **proguard-rules.pro**
>  
>  
>     -keep class com.edfapg.sdk.** {
>      public protected private *;
>     }

##

Usage

> [!IMPORTANT]
>
> ###
>
> Initialize SDK
>
> Dart
>  
>  
>     EdfaPgSdk.instance.config(
>      key: MERCHANT_CLIENT_KEY, // Your Secret Merchant Key
>      password: MERCHANT_CLIENT_PASSWORD, // Your Secret Merchant Password
>      enableDebug: true
>     );
>
> [!TIP]
>
> ###
>
> Get Ready for Payment
>

>> **Create`EdfaPgSaleOrder` Model**

>>

>> Dart

>>  
>>  
>>       final order = EdfaPgSaleOrder(

>>         id: EdfaPgSdk.instance.HELPER.generateUUID(),

>>         description: "Test Order",

>>         currency: "SAR",

>>         amount: 1.00//Random().nextInt(9)/10, // will not exceed 0.9

>>       );

>>

>> **Create`EdfaPgPayer` Model**

>>

>> Dart

>>  
>>  
>>       final payer = EdfaPgPayer(

>>         firstName: "First Name",

>>         lastName: "Last Name",

>>         address: "EdfaPay Payment Gateway",

>>         country: "SA",

>>         city: "Riyadh",

>>         zip: "123768",

>>         email: "support@edapay.com",

>>         phone: "+966500409598",

>>         ip: "66.249.64.248",

>>         options: EdfaPgPayerOption( // Options

>>           middleName: "Middle Name",

>>           birthdate: DateTime.parse("1987-03-30"),

>>           address2: "Usman Bin Affan",

>>           state: "Al Izdihar"

>>         )

>>       );

>>

>> **Payment with Card**

>>

>> Dart

>>  
>>  
>>       EdfaCardPay()

>>         .setOrder(order)

>>         .setPayer(payer)

>>         .onTransactionSuccess((response){

>>          print("onTransactionSuccess.response ===>
${response.toString()}");

>>       }).onTransactionFailure((response){

>>        print("onTransactionFailure.response ===> ${response.toString()}");

>>       }).onError((error){

>>        print("onError.response ===> ${error.toString()}");

>>       }).initialize(context);

>>

>> **Pay With ApplePay - iOS Only**

>>

>> Dart

>>  
>>  
>>       EdfaApplePay()

>>         .setOrder(order)

>>         .setPayer(payer)

>>         .setApplePayMerchantID(APPLEPAY_MERCHANT_ID)

>>         .onAuthentication((response){

>>        print("onAuthentication.response ===> ${response.toString()}");

>>       }).onTransactionSuccess((response){

>>        print("onTransactionSuccess.response ===> ${response.toString()}");

>>       }).onTransactionFailure((response){

>>        print("onTransactionFailure.response ===> ${response.toString()}");

>>       }).onError((error){

>>        print("onError.response ===> ${error.toString()}");

>>       }).initialize(context);

>
> ###
>
> Addon's
>

>> **Create`EdfaPgSaleOrder` & `EdfaPgPayer` Model** Like This

>>

>> **Create`EdfaPgSaleOption` Model**

>>

>> Dart

>>  
>>  
>>       final saleOption = EdfaPgSaleOption(

>>         channelId: "channel-id-here", // channel-id if its enable for
merchant

>>         recurringInit: true // Make sure recurring is enabled for merchant
and [true=if want to do recurring, false=if don't want do recurring]

>>       );

>>

>> **Create`EdfaPgCard` Model**

>>

>> Dart

>>  
>>  
>>       final card = EdfaPgCard(

>>         number: "1234567890987654",

>>         expireMonth: 01,

>>         expireYear: 2028,

>>         cvv: 123

>>       );

>>

>> **Sale Transaction** \- Make sure to pass null to `saleOption:` and false
to `isAuth:`

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.instance.ADAPTER.SALE.execute(

>>         order: order,

>>         card: card,

>>         payer: payer,

>>         saleOption: null,

>>         isAuth: false,

>>         onResponse: SaleResponseCallback(

>>           success: (EdfaPgSaleSuccess result) {

>>            debugPrint(result.toJson().toString());

>>  
>>           },

>>           decline: (EdfaPgSaleDecline result) {

>>            debugPrint(result.toJson().toString());

>>  
>>           },

>>           recurring: (EdfaPgSaleRecurring result) {

>>            debugPrint(result.toJson().toString());

>>  
>>           },

>>           redirect: (EdfaPgSaleRedirect result) {

>>            debugPrint(result.toJson().toString());

>>  
>>           },

>>           secure3d: (EdfaPgSale3DS result) {

>>            debugPrint(result.toJson().toString());

>>  
>>           },

>>           error: (EdfaPgError result) {

>>            debugPrint(result.toJson().toString());

>>           }

>>         ),

>>         onResponseJSON: (data){

>>          debugPrint(data);

>>         },

>>         onFailure: (result) {

>>          debugPrint(result.toJson().toString());

>>         }

>>       );

>>

>> **Recurring Transaction**

>>

>>   * Make sure to pass false to `isAuth:`

>>   * Card Number should be passed the same used for the first `Sale` with
`EdfaPgSaleOption.recurringInit==true`

>>   * `EdfaPgRecurringOptions.firstTransactionId:` should `transactionId`
from first success `Sale` with `EdfaPgSaleOption.recurringInit==true`

>>   * `EdfaPgRecurringOptions.token:` Should be recurringToken from first
success `Sale` with `EdfaPgSaleOption.recurringInit==true`

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.instance.ADAPTER.RECURRING_SALE.execute(

>>         cardNumber: "1234567890123456",

>>         isAuth: false,

>>         order: order,

>>         payerEmail: "support@edfapay.com",

>>         recurringOptions: EdfaPgRecurringOptions(

>>           firstTransactionId: "c9f9b51b-72f4-4e2d-8a49-3b26c97b2f50",

>>           token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

>>         ),

>>         onResponse: RecurringSaleResponseCallback(

>>           success: (EdfaPgSaleSuccess result) {

>>            debugPrint(result.toJson().toString());

>>           },

>>           decline: (EdfaPgSaleDecline result) {

>>            debugPrint(result.toJson().toString());

>>           },

>>           recurring: (EdfaPgSaleRecurring result) {

>>            debugPrint(result.toJson().toString());

>>           },

>>           redirect: (EdfaPgSaleRedirect result) {

>>            debugPrint(result.toJson().toString());

>>           },

>>           secure3d: (EdfaPgSale3DS result) {

>>            debugPrint(result.toJson().toString());

>>           },

>>           error: (EdfaPgError result) {

>>            debugPrint(result.toJson().toString());

>>           }

>>         ),

>>         onResponseJSON: (data){

>>          debugPrint(data);

>>         },

>>         onFailure: (result) {

>>          debugPrint(result.toJson().toString());

>>         }

>>       );

>>

>> **Capture Transaction**

>>

>>   * `transactionId:` should `transactionId` from success `Sale` with
`isAuth:true`

>>   * Card Number should be passed the same used for the `Sale` with
`isAuth:true`

>>   * `cardNumber:` should authorized by `Sale` with `isAuth:true`

>>   * `amount:` should be the same as `Sale` with `isAuth:true`

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.instance.ADAPTER.CAPTURE.execute(

>>         amount: 1.0,

>>         transactionId: "c9f9b51b-72f4-4e2d-8a49-3b26c97b2f50",

>>         cardNumber: "1234567890123456",

>>         payerEmail: "support@edfapay.com",

>>         onResponse: CaptureResponseCallback(

>>           success: (EdfaPgCaptureSuccess result){

>>            debugPrint(result.toJson().toString());

>>           },

>>           decline: (EdfaPgCaptureDecline result){

>>            debugPrint(result.toJson().toString());

>>           },

>>           error: (EdfaPgError result){

>>            debugPrint(result.toJson().toString());

>>           }

>>         ),

>>         onResponseJSON: (data){

>>          debugPrint(data);

>>         },

>>         onFailure: (result) {

>>          debugPrint(result.toJson().toString());

>>         }

>>       );

>>

>> **Credit Void Transaction**

>>

>>   * `transactionId:` should `transactionId` from success `Sale` with
`isAuth:true`

>>   * Card Number should be passed the same used for the `Sale` with
`isAuth:true`

>>   * `cardNumber:` should authorized by `Sale` with `isAuth:true`

>>   * `amount:` should be the same as `Sale` with `isAuth:true`

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.instance.ADAPTER.CREDIT_VOID.execute(

>>         amount: 1.0,

>>         transactionId: "c9f9b51b-72f4-4e2d-8a49-3b26c97b2f50",

>>         cardNumber: "1234567890123456",

>>         payerEmail: "support@edfapay.com",

>>         onResponse: CreditVoidResponseCallback(

>>           success: (EdfaPgCreditVoidSuccess result){

>>            debugPrint(result.toJson().toString());

>>           },

>>           error: (EdfaPgError result){

>>            debugPrint(result.toJson().toString());

>>           }

>>         ),

>>         onResponseJSON: (data){

>>          debugPrint(data);

>>         },

>>         onFailure: (result) {

>>          debugPrint(result.toJson().toString());

>>         }

>>       );

>>

>> **Transaction Detail**

>>

>>   * `transactionId:` should be from the last transaction,

>>   * `cardNumber:` should be passed the same used for the last transaction

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.instance.ADAPTER.TRANSACTION_DETAILS.execute(

>>         transactionId: "c9f9b51b-72f4-4e2d-8a49-3b26c97b2f50",

>>         cardNumber: "1234567890123456",

>>         payerEmail: "support@edfapay.com",

>>         onResponse: TransactionDetailsResponseCallback(

>>           success: (EdfaPgTransactionDetailsSuccess result){

>>            debugPrint(result.toJson().toString());

>>           },

>>           error: (EdfaPgError result){

>>            debugPrint(result.toJson().toString());

>>           }

>>         ),

>>         onResponseJSON: (data){

>>          debugPrint(data);

>>         },

>>         onFailure: (result) {

>>          debugPrint(result.toJson().toString());

>>         }

>>       );

>>

>> **Transaction Status**

>>

>>   * `transactionId:` should be from the last transaction,

>>   * `cardNumber:` should be passed the same used for the last transaction

>>

>>

>> Dart

>>  
>>  
>>       EdfaPgSdk.instance.ADAPTER.TRANSACTION_STATUS.execute(

>>         transactionId: "c9f9b51b-72f4-4e2d-8a49-3b26c97b2f50",

>>         cardNumber: "1234567890123456",

>>         payerEmail: "support@edfapay.com",

>>         onResponse: TransactionStatusResponseCallback(

>>           success: (EdfaPgTransactionStatusSuccess result){

>>            debugPrint(result.toJson().toString());

>>           },

>>           error: (EdfaPgError result){

>>            debugPrint(result.toJson().toString());

>>           }

>>         ),

>>         onResponseJSON: (data){

>>          debugPrint(data);

>>         },

>>         onFailure: (result) {

>>          debugPrint(result.toJson().toString());

>>         }

>>       );

##

Getting help

To report a specific issue or feature request, open a new issue.

Or write a direct letter to the support@edfapay.sa.

##

License

MIT License. See the LICENSE file for more details.

##

Contacts

Website: https://edfapay.com/home/ Phone: +966920031242 Email:
support@edfapay.sa 7637 Othman Bin Affan St., 2123 Al Ezdihar Dist., 12487
Riyadh, Riyadh, Saudi Arabia

© 2022 - 2023 EdfaPay. All rights reserved.

Updated 3 months ago

CS Cart

IOS

Ask AI



--- URL: https://docs.edfapay.com/docs/faqs ---

Find quick answers to the most common questions about using the EdfaPay
platform, covering setup, integration, troubleshooting, and best practices.
This section is designed to help merchants and partners resolve issues and
understand features without needing direct support.

###

Frequently Asked Questions (FAQ)

What card number can I use to test payments?

You can use the following test card details when your account is in test mode:

  * Card Number: `5123 4500 0000 0008`
  * Expiry: `01/39`
  * CVV: `100`

These details simulate transactions without using real payment methods.

Can I use my real (live) card when testing payments?

No, only test cards work in test mode. Live cards are not supported during
testing. Once you're ready for live mode, contact us to update your account.

Is it possible to test Apple Pay while in test mode?

No, Apple Pay is only available in live mode on a compatible device (iPhone,
Mac).

How can I integrate Apple Pay in S2S integration or using the SDK?

  * Have an active Apple Developer account and create an Apple Merchant ID.
  * Contact our technical team for the necessary certificates and configuration files.
  * We recommend scheduling a short setup session with us.

Can I use a callback URL hosted on localhost?

No, it must be publicly accessible over the internet.

Can I use HTTP instead of HTTPS for the callback URL?

No, HTTPS is required for secure communication.

Can I use the same order ID more than once?

No, each `order_id` must be unique.

How should I build my callback URL?

Create a public POST endpoint (form-data) to capture the full callback data
and store it for reference. Then configure it through dashboard

Where should the callback URL be configured?

Go to EdfaPay Dashboard → Settings → Callback URL and update it there.

How do I show the payment result using the callback response?

Match the `order_id` from the callback with your order and display the status
(`SUCCESS`, `FAILED`) on your confirmation page. Include the confirmation page
URL as `term_3ds_url` when initiating payment.

How can I customize the payment page UI?

Use our S2S Payment API for full control over the design, branding, and user
experience, keeping customers on your site.

Which fields are mandatory when initiating a new payment?

`action, edfa_merchant_id, order_id, order_amount, order_currency,
order_description, req_token, payer_first_name, payer_last_name, payer_email,
payer_phone, payer_ip, term_url_3ds, auth, recurring_init, hash`.

Can payer_first_name and payer_last_name be in Arabic?

Yes, both can be in Arabic or English, max 32 characters each.

Can I use IPv6 for payer_ip?

No, only IPv4 is supported.

Do I need to change settings when switching from checkout redirection to
embedded checkout?

Yes, the integration uses different S2S APIs and request structures.

If a WooCommerce merchant changes their domain, do they need to notify us?

No. They just need to log in to the dashboard and update the callback URL.

How do I validate the received callback is from EdfaPay?

Every callback sent by EdfaPay includes a `hash` parameter. To validate the
callback, recalculate the hash on your server and compare it with the `hash`
value received in the callback. The callback is valid only if both hashes
match. **Checkout Callback Hash Formula:**

    
    
     MD5(strtoupper(strrev(email) + PASSWORD + trans_id + strrev(substr(card_number,0,6) + substr(card_number,-4))))

Should the hash received in the callback match the hash sent in the initiate
request?

No. The hash received in the callback should **not** match the hash sent in
the initiate request. Each hash is generated using a different formula and
serves a different purpose, so they are expected to be different.

How do I get started with EdfaPay integration?

Receive sandbox credentials, test APIs or plugins, then request production
credentials. Guides and Postman collections are available.

What’s the difference between Hosted Checkout and Embedded Checkout?

  * **Hosted Checkout:** Redirect to EdfaPay’s secure page.
  * **Embedded Checkout:** Payment fields on your site via S2S APIs.

Can I use the same API credentials for multiple domains?

No, credentials are domain-specific. Contact us to add more domains.

What currencies are supported?

SAR by default. Other currencies can be enabled upon merchant request, but all
payouts will be settled in SAR.

Do I need to send the amount in integer or decimal format?

Use decimal format with two decimal places (e.g., `100.00`).

Can I change the amount after creating the payment link?

No, you must create a new payment link.

How long do refunds take to reflect?

Usually 10–14 business days, depending on the method and bank.

Do I get a callback when a refund is processed?

Yes, if a callback URL is configured.

What is the difference between User and Supervisor roles?

  * **User:** View transactions, generate links, basic access.
  * **Supervisor:** Full access, manage users, change settings, view API credentials.

When will I receive my settlement?

Contact support for your settlement schedule.

Can I process international payments?

Yes, if enabled on your account and approved by your acquiring bank.

Is there a minimum transaction amount?

Yes. Transactions below 0.10 SAR are not allowed.

Is there a maximum transaction amount?

No fixed maximum from EdfaPay, but banks may have limits.

Can I export my transaction history?

Yes, via dashboard → Transactions → Export.

How can I find the reason for a declined transaction?

  * From the dashboard, click the Eye icon to view the payment receipt where you will find reason.
  * The rejection reason is also included in the callback response.
  * You can call the Status API where the response will also include reason.
  * If the reason is still unclear, contact us at techsupport@edfapay.com.

How do I update my bank account details for settlements?

Contact support for the update process.

Do you support multiple stores under one account?

Yes, contact us to configure it.

How do I close my merchant account?

Email `onboarding@edfapay.com` from your registered merchant email. Ensure all
settlements, refunds, and chargebacks are complete.

Can I add my developer or employee as a dashboard user?

Yes, go to Users → Add User in the dashboard. The new user will get an email
invite.

Updated about 1 month ago

3D Secure

Ask AI



--- URL: https://docs.edfapay.com/docs/getting-started ---

###

Welcome to EdfaPay Payment Gateway

EdfaPay enables businesses to accept payments online with speed, security, and
flexibility. Whether you’re integrating for the first time or managing
multiple merchants, this guide will help you move from setup to going live
smoothly.

###

Who We Are ?

EdfaPay is a leading payment technology company that simplifies how businesses
collect payments. Our mission is to empower merchants and partners with
reliable, fast, and secure payment solutions designed for the modern digital
world.

Currently operating across the GCC region, EdfaPay offers a scalable and
developer-friendly platform for e-commerce, retail, and fintech partners.

###

How Does EdfaPay Work?

  1. **Create Your Account** — Register and verify your merchant profile.
  2. **Integrate Your Store** — Use our Hosted Checkout or Server-to-Server APIs.
  3. **Start Accepting Payments** — Go live and begin processing transactions securely.

###

What We Offer

###

Flexible Integration Options

Choose from:

  * **Hosted Checkout** — Quick setup and secure hosted pages.
  * **Server-to-Server (S2S)** — Full control with seamless backend integration.

###

Multiple Payment Methods

Accept **credit cards, debit cards, Apple Pay, STC Pay** , and more.

###

Real-Time Monitoring

Track transactions, settlements, and refunds from your **EdfaPay Dashboard**.

###

Security & Compliance

PCI-DSS certified infrastructure ensuring every payment is processed safely.

###

Why Choose EdfaPay?

  * **Empower your business** — Offer smooth, fast payment experiences to your customers.
  * **Boost conversion** — Reduce cart abandonment with local payment methods.
  * **Simple, flexible, and scalable** — Built for startups and enterprises alike.
  * **Instant settlements** — Receive your funds without delays.
  * **Dedicated support** — A professional team to assist you at every step.

###

Ready to Begin?

Follow our step-by-step setup guide to start integrating EdfaPay today.

Integration Overview

Understand how EdfaPay’s system works before you start integrating.

Merchant Registration

Register your business and get your test credentials.

**EdfaPay — Powering secure payments for modern businesses.**

Updated 3 months ago

Overview

Ask AI



--- URL: https://docs.edfapay.com/docs/international-payment ---

EdfaPay supports international card payments for merchants who require
transactions beyond the GCC region and Egypt. This feature enables businesses
to accept payments from customers globally using supported international
cards.

Default Supported Countries: By default, EdfaPay enables payment acceptance
from the following countries:

GCC Countries: Saudi Arabia, United Arab Emirates, Kuwait, Oman, Qatar,
Bahrain and Egypt

Requesting Access for International Payments: If a merchant wishes to enable
international card payments (outside the default supported countries), they
must request activation by contacting the onboarding team.

> 📘
>
> Notes
>
>   * Merchants must request international access via onboarding@edfapay.com.
>   * The service supports merchants in 150+ countries, subject to account
> approval.
>   * Multi-currency pricing and settlement may vary based on region—confirm
> with support.
>   * Fraud protection tools and 3DS authentication may be applied based on
> card issuer and regional regulations.
>

Updated 3 months ago

Terminal

Tamara Payment Method

Ask AI



--- URL: https://docs.edfapay.com/docs/overview-1 ---

##

Welcome to EdfaPay SoftPOS Documentation

Transform any compatible Android device into a secure, fully functional Point
of Sale (POS) terminal with **EdfaPay SoftPOS**. This innovative solution
empowers businesses to accept contactless payments effortlessly, significantly
reducing costs while maintaining top-tier security standards — all without
traditional POS hardware.

###

Why Choose EdfaPay SoftPOS?

EdfaPay SoftPOS offers a seamless, cost-effective, and scalable approach to
in-person payment acceptance, designed for modern businesses:

  * **Hardware-Free Payments** : Accept contactless **Visa** , **Mastercard** , **Mada** , and mobile wallet payments directly on your Android device—no additional POS terminals needed.
  * **Secure & Certified**: Ensure every transaction is protected with full compliance to **PCI DSS** , **EMVCo** , and **NFC/contactless** standards.
  * **Fast Setup** : Install the app, onboard your business, and start accepting payments in minutes.
  * **White-Label Ready** : Customize SoftPOS with your brand’s look and feel to create a unified experience for your merchants or partners.
  * **Unified Dashboard** : Monitor all in-person and online transactions from a single dashboard for complete oversight.
  * **Affordable Scaling** : Eliminate traditional hardware costs, empowering your staff or merchants to accept payments anywhere.

###

EdfaPay SoftPOS Capabilities

Explore the key features designed to simplify and enhance your in-person
payment experience:

Contactless Card Acceptance

Accept NFC-enabled credit/debit cards directly on your Android device,
eliminating extra hardware.

Mobile Wallet Payments

Support major digital wallets (Apple Pay*, Google Pay, Mada Pay, etc.) for
maximum customer convenience.

Real-Time Transaction Monitoring

Track all SoftPOS transactions instantly via the EdfaPay Dashboard or our
APIs.

Multi-User Management

Assign multiple devices or staff under a single merchant account for
streamlined operations.

Refund & Settlement Management

Initiate refunds and view detailed settlement reports from your dashboard.

Secure Authentication

Protect sensitive cardholder data with built-in encryption and tokenization at
every stage.

  * Apple Pay availability may depend on region and device support.

###

Documentation Overview

Quickly find the resources you need to effectively use EdfaPay SoftPOS:

  * **Getting Started** – Learn to onboard, configure, and activate EdfaPay SoftPOS for your business or merchants.
  * **Integration & APIs** – Access API endpoints and SDKs to integrate SoftPOS into your existing systems or applications.
  * **Dashboard Management** – Manage SoftPOS devices, monitor transactions, and generate reports from the unified dashboard.
  * **Testing & Sandbox** – Use our sandbox to simulate SoftPOS transactions and test integrations before going live.
  * **Compliance & Security** – Review detailed security measures, certifications, and compliance for EdfaPay SoftPOS.
  * **Support & Troubleshooting** – Find FAQs, error codes, and step-by-step guides for resolving common issues.

###

Simplified Activation Flow

Activating EdfaPay SoftPOS is a straightforward and secure process:

  1. **Install App** : Download and install the EdfaPay SoftPOS app on a compatible Android device.
  2. **Business Onboarding** : Register or link your merchant account through the EdfaPay Dashboard.
  3. **Device Activation** : Securely activate your device using the credentials or QR code provided in your dashboard.
  4. **Start Accepting Payments** : Immediately begin accepting contactless card and wallet payments.
  5. **Monitor & Manage**: Utilize the EdfaPay Dashboard to track, refund, and reconcile all transactions.

We are committed to providing you with the essential tools, comprehensive
documentation, and dedicated support needed to successfully deploy EdfaPay
SoftPOS. Begin exploring our documentation today and transform your Android
devices into powerful, secure POS terminals.

Updated about 2 months ago

Android

Merchant Registration

Ask AI



--- URL: https://docs.edfapay.com/docs/go-live-checklist ---

To activate your account in Live Mode, you must complete the following
essential requirements. This checklist ensures your EdfaPay integration is
thoroughly tested, secure, and fully prepared for production transactions.

Please ensure all of the following integration and validation steps are
completed before requesting live activation.

  * Test API Calls with Your Credentials

Import the official EdfaPay Postman Collection into Postman.

Configure your sandbox credentials within the environment.

Perform at least one test payment using either the Initiate API or the Sale
S2S API.

  * Webhook Verification

Verify that your system correctly receives and processes webhook notifications
from EdfaPay. This ensures real-time updates on transaction statuses and other
important events, critical for automated workflows and reconciliation.

  * Transaction Status Check

Implement and test the Transaction Status API to reliably retrieve the current
status of any payment. This is crucial for confirming successful transactions,
handling pending states, and managing any failed attempts within your
application.

  * Hash Generation

    * Understand and correctly implement the hash generation mechanism for securing your API requests. This cryptographic signature ensures the integrity and authenticity of data exchanged with EdfaPay, protecting against tampering and unauthorized access.
  * Refund Flow

Test your integration's ability to process refunds successfully. This includes
initiating refunds for completed transactions and verifying that the correct
amounts are credited back, ensuring a smooth customer service experience.

###

Request Go Live

Once all the above steps are completed and you are confident your integration
is ready, click the button below to send your Go Live request:

Request Go Live

**Click here to send your Go Live request.**

Updated 3 months ago

Test cards

Payment Methods

Ask AI



--- URL: https://docs.edfapay.com/docs/merchant-registration ---

###

EdfaPay Merchant Registration: Your Comprehensive 3-Phase Guide

Start your EdfaPay journey with our streamlined, three-phase online
registration. This guide offers a detailed overview of each step, preparing
you for what to expect and helping you gather the necessary documents for a
seamless onboarding experience. Ready to begin? Register Now

###

Phase 1: Your Contact and Business Type Details

The initial phase focuses on gathering your essential contact and business
type information.

####

Required Information

  * **Full Name:** Your complete legal name.
  * **Mobile Number:**
    * A unique mobile number not previously registered with EdfaPay.
    * You can register using an international phone number.
  * **Email Address:** A unique email address not previously registered with EdfaPay.
  * **Business Type:** Select one of the following: 
    * Company
    * Freelancer

> 📘
>
> ###
>
> Important Note:
>
> All provided contact details (Full Name, Mobile Number, Email Address) must
> be unique and not previously associated with an EdfaPay account.

###

Phase 2: Entity and Banking Information

In this phase, you will provide specific details about your company or
freelance entity.

####

Required Fields

  * **Entity Name:** Your registered business name or personal name (for freelancers).
  * **Entity Website:** A direct link to your official landing page or professional portfolio.
  * **Bank IBAN:**
    * Must be a valid Saudi Arabian IBAN.
    * Format: 24 characters.
    * Example: `SA0380000000123456781234`
  * **Commercial Registration (CR) Number (for Companies):**
    * Issued by the Saudi Ministry of Commerce.
    * Format: 10 digits.
    * Example: `1011234567`
  * **Unified Number (for Companies):**
    * Issued by the Saudi Ministry of Commerce.
    * Format: 10 digits.
    * Starts with: `9200`.
    * Example: `9200123456`

###

Phase 3: Essential Document Submission

The final phase requires you to upload official documents for business
verification.

####

Required Documents

Document| Description / Source  
---|---  
**CR Certificate**|  Your Commercial Registration certificate, issued by the
Ministry of Commerce.  
**IBAN Certificate**|  A certificate from your bank, clearly showing the IBAN
linked to your registered business name.  
**National ID**|  A copy of the personal ID for the business owner or the
authorized representative.  
**National Address**|  Obtainable from the Saudi Post (SPL). Download from SPL
National Address.  
  
> **Important Note:** All uploaded files must be **less than 1 MB** in size
> and provided in either PDF or JPG format.

###

What Happens After Registration?

Upon successful submission of your registration form, Your application will be
sent to EdfaPay’s onboarding team for review.

###

Next Steps

  * Our team will meticulously review all submitted information and documents.
  * You will be contacted via phone or email to proceed with the final verification steps and account activation.

###

Merchant Registration Guide

To help you successfully complete the merchant onboarding process on EdfaPay,
detailed registration guides are available in both English and Arabic.

These guides provide step-by-step instructions on how to register a new
merchant by filling out the merchant registration form, uploading the required
documents in the correct format, and submitting the registration through the
dashboard.

Language| Download Link  
---|---  
**English**| Merchant Registration Guide  
**Arabic**| دليل تسجيل التجار  
  
Updated 21 days ago

Partner Features

SandBox Environment

Ask AI



--- URL: https://docs.edfapay.com/docs/ios ---

View SDK Wiki | Report new issue

#

EdfaPg iOS SDK

EdfaPg is a payment gateway. Thanks to our 15+ years of experience in the
payment industry, we’ve developed a state-of-the-art white-label payment
system that ensures smooth and uninterrupted payment flow for merchants across
industries.

EdfaPg iOS SDK was developed and designed with one purpose: to help the iOS
developers easily integrate the EdfaPg API Payment Platform for a specific
merchant.

The main aspects of the EdfaPg iOS SDK:

  * Swift is the main language
  * Minimum iOS 11
  * Sample Application

To get used to the SDK, download a sample app.

##

Setup

Add to the `Podfile`:

    
    
    pod 'EdfaPgSdk'

Always download latest version by run `pod update` or `pod install --repo-
update`

##

Usage

> [!IMPORTANT]
>
> ###
>
> Initialize SDK
>
> You should initialise Edfapay SDK. We recommend to do it in
> AppDelegate.swift file:
>
> Swift
>  
>  
>      let edfaPgCredential = EdfaPgCredential(
>           clientKey: MERCHANT_KEY,
>           clientPass: MERCHANT_PASSWORD,
>           paymentUrl: PAYMENT_URL
>         )  
>         EdfaPgSdk.config(edfaPgCredential)
>
> [!TIP]
>
> ###
>
> Get Ready for Payment
>

>> **Create`EdfaPgSaleOrder` Model**

>>

>> Swift

>>  
>>  
>>       let order = EdfaPgSaleOrder(

>>         id: UUID().uuidString,

>>         description: "Test Order",

>>         currency: "SAR",

>>         amount: 1.00//Random().nextInt(9)/10, // will not exceed 0.9

>>       );

>>

>> **Create`EdfaPgPayer` Model**

>>

>> Swift

>>  
>>  
>>       let payer = EdfaPgPayer(

>>         firstName: "First Name",

>>         lastName: "Last Name",

>>         address: "EdfaPay Payment Gateway",

>>         country: "SA",

>>         city: "Riyadh",

>>         zip: "123768",

>>         email: "support@edapay.com",

>>         phone: "+966500409598",

>>         ip: "66.249.64.248",

>>         options: EdfaPgPayerOption( // Options

>>           middleName: "Middle Name",

>>           birthdate: DateTime.parse("1987-03-30"),

>>           address2: "Usman Bin Affan",

>>           state: "Al Izdihar"

>>         )

>>       );

>>

>> **Payment with SDK Card UI**

>>

>> Swift

>>  
>>  
>>       EdfaCardPay()

>>         .set(order: order)

>>         .set(payer: payer)

>>         .set(designType: .one)

>>         .set(language: .ar)

>>         .on(transactionFailure: { result, err in

>>             debugPrint(result ?? "No Result")

>>             debugPrint(err ?? "No Error Summary")

>>           })

>>           .on(transactionSuccess: { res, data in

>>             debugPrint(res ?? "Missing Result")

>>             debugPrint(data ?? "Missing Data")

>>           }).initialize(

>>             target: self,

>>             onError: { err in

>>               debugPrint(err)

>>             },

>>             onPresent: {

>>               debugPrint("onPresent :)")

>>             }

>>           )

>>

>> **Pay With ApplePay**

>>

>> Swift

>>  
>>  
>>      EdfaApplePay()

>>           .set(order: order)

>>           .set(payer: payer)

>>           .set(applePayMerchantID: APPLEPAY_MERCHANT_ID)

>>           .enable(logs: true)

>>           .on(authentication: { auth in

>>             debugPrint("onAuthentication: \(String(data:
auth.token.paymentData, encoding: .utf8)!)")

>>           }).on(transactionFailure: { res in

>>             debugPrint(res)

>>           }).on(transactionSuccess: { res in

>>             debugPrint(res ?? "onSuccess \(res)")

>>           }).initialize(

>>             target: self,

>>             onError: { errors in

>>               debugPrint("onError: \(errors)")

>>             },

>>             onPresent: {

>>               debugPrint("onPresent: (-:")

>>             }

>>           )

>>

>> Make sure Apple Pay merchant id is selected

>>

>> Refer:https://developer.apple.com/documentation/xcode/configuring-apple-
pay-support

>>

>> **Pay With Card details**

>>

>> Swift

>>  
>>  
>>       let card = EdfaPgCard(

>>           number: "5123445000000008",

>>           expireMonth: Int(01),

>>           expireYear: Int(2039),

>>           cvv: "100"

>>         )

>>  
>>         EdfaPayWithCardDetails(viewController: self)

>>            .set(order: order)

>>            .set(payer: payer)

>>            .set(card: card)

>>            .onTransactionSuccess { response, result in

>>              print("Transaction Success: \(result)")

>>            }

>>            .onTransactionFailure { response, error in

>>              print("Transaction Failed: \(error)")

>>            }

>>            .initialize(onError: { err in

>>              debugPrint(err)

>>           })

##

Getting help

To report a specific issue or feature request, open a new issue.

Or write a direct letter to the support@edfapay.com.

##

License

MIT License. See the LICENSE file for more details.

##

Contacts

Website: https://edfapay.com Phone: +966920033633 Email: support@edfapay.com
Address: EdfaPg, Olaya Street, Riyadh, Saudi Arabia

© 2023 - 2024 EdfaPg. All rights reserved.

Updated 3 months ago

Flutter

Android

Ask AI



--- URL: https://docs.edfapay.com/docs/fraud-plan ---

At EdfaPay, we are committed to maintaining the highest standards of payment
security and fraud prevention. This document outlines our fraud monitoring
process and how we handle suspicious activity in cooperation with our
merchants.

###

Monitoring System

We have a real-time fraud detection engine that actively monitors all
transactions and flags suspicious patterns, including:

  * Excessive failed payment attempts
  * Unusual order values or volumes
  * High-risk BIN ranges (based on issuing country or card type)
  * IP geolocation mismatches
  * Repeated usage of the same card across multiple accounts

###

Key Fraud Prevention Measures

  * **3D Secure (3DS)** : Mandatory for all eligible cards to verify cardholder identity.
  * **Velocity Checks** : Detect unusual transaction frequency from the same card, IP, or account.
  * **Geo-location Validation** : Verifying whether the cardholder’s IP matches the billing address country.
  * **Device Fingerprinting** : Identify high-risk devices or suspicious patterns.
  * **BIN Checks** : Validate if the card type and country match the payment details.
  * **Blacklist Management** : Block transactions from flagged cards, IPs, or emails.

###

Merchant Responsibilities

Merchants are expected to:

  * Avoid shipping goods before verifying high-risk transactions.
  * Monitor their own dashboards for flagged activities.
  * Contact onboarding@edfapay.com if you suspect fraudulent behavior.

###

Response to Fraud Alerts

To further reduce fraud exposure:

  * Require customer phone and email verification at checkout.
  * Monitor refund/chargeback rates.
  * Avoid manual approvals for high-ticket or cross-border orders.
  * Train customer service teams to detect suspicious behavior.

Updated 3 months ago

Tamara Payment Method

Transaction Decline Codes

Ask AI



--- URL: https://docs.edfapay.com/docs/merchant-registration-1 ---

###

EdfaPay Merchant Registration: Your Comprehensive 3-Phase Guide

Start your EdfaPay journey with our streamlined, three-phase online
registration. This guide offers a detailed overview of each step, preparing
you for what to expect and helping you gather the necessary documents for a
seamless onboarding experience. Ready to begin? Register Now

###

Phase 1 Your Contact and Business Type Details

The initial phase focuses on gathering your essential contact and business
type information.

####

Required Information

  * **Full Name:** Your complete legal name.

  * **Mobile Number:**

    * A unique mobile number not previously registered with EdfaPay.
    * You can register using international phone number
  * **Email Address:** A unique email address not previously registered with EdfaPay.

  * **Business Type:** Select one of the following:

    * Company
    * Freelancer

> 📘
>
> ###
>
> Important Note:
>
> All provided contact details (Full Name, Mobile Number, Email Address) must
> be unique and not previously associated with an EdfaPay account.

###

Phase 2 Entity and Banking Information

In this phase, you will provide specific details about your company or
freelance entity.

####

Required Fields

  * **Entity Name:** Your registered business name or personal name (for freelancers).

  * **Entity Website:** A direct link to your official landing page or professional portfolio.

  * **Bank IBAN:**

    * Must be a valid Saudi Arabian IBAN.
    * Format: 24 characters.
    * Example: `SA03 8000 0000 XXXX XXXX XXXX`
  * **Commercial Registration (CR) Number (for Companies):**

    * Issued by the Saudi Ministry of Commerce.
    * Format: 10 digits.
    * Example: `1011234567`
  * **Unified Number (for Companies):**

    * Issued by the Saudi Ministry of Commerce.
    * Format: 10 digits.
    * Starts with: `9200`.
    * Example: `9200123456`

###

Phase 3 Essential Document Submission

The final phase requires you to upload official documents for business
verification.

####

Required Documents

Document| Description / Source  
---|---  
**CR Certificate**|  Your Commercial Registration certificate, issued by the
Ministry of Commerce.  
**IBAN Certificate**|  A certificate from your bank, clearly showing the IBAN
linked to your registered business name.  
**National ID**|  A copy of the personal ID for the business owner or the
authorized representative.  
**National Address**|  Obtainable from the Saudi Post (SPL). Download from SPL
National Address.  
  
> **Important Note:** All uploaded files must be less than 1.5 MB in size and
> provided in either PDF or JPG format.

###

What Happens After Registration? Your Next Steps

Upon successful submission of your registration form, your application will be
promptly forwarded to EdfaPay’s dedicated business onboarding team for
comprehensive review.

###

Next Steps

  * Our team will meticulously review all submitted information and documents.
  * You will be contacted via phone or email to proceed with the final verification steps and account activation.

Updated 3 months ago

Overview

Production Environment

Ask AI



--- URL: https://docs.edfapay.com/docs/overview-2 ---

###

Apple Pay: Seamless and Secure Payments with EdfaPay

**Introduction**

Apple Pay offers a secure, fast, and convenient way for customers to pay using
their Apple devices (iPhone, iPad, Mac, Apple Watch). EdfaPay simplifies Apple
Pay integration for merchants, providing two flexible models to suit your
business needs.

###

Choosing Your Integration Method

Deciding between Checkout Integration and Embedded (S2S) Integration depends
on your technical capabilities, desired control, and development timeline.

  * **Checkout Integration is ideal if you:**

    * Need a quick and easy setup.
    * Prefer minimal technical overhead and responsibilities.
    * Want EdfaPay to manage certificates, domains, and security.
    * Are looking for a fully hosted and pre-certified solution.
  * **Embedded Integration (S2S) is ideal if you:**

    * Require full control over the Apple Pay UI and payment flow.
    * Have the technical resources to manage Apple Developer accounts, certificates, and domain verification.
    * Are comfortable with both frontend and backend development for payment processing.
    * Need to integrate Apple Pay into a highly customized or complex existing system.

###

Integration Approaches

EdfaPay offers two distinct integration models for Apple Pay, designed to fit
different merchant requirements:

Checkout Integration

This is EdfaPay's recommended and most straightforward method for enabling
Apple Pay, ideal for rapid setup:

  * No Apple Developer Account needed
  * No complex certificate or domain management required
  * Leverages EdfaPay's pre-certified and hosted Apple domain
  * Apple Pay is automatically enabled by our team upon activation

> Perfect for merchants seeking a quick, secure integration without extensive
> technical overhead.

Embedded Integration (Server-to-Server - S2S)

This advanced integration provides merchants with full control over the Apple
Pay transaction flow, covering both frontend and backend development.

**Merchant Responsibilities:**

  * Register for an Apple Developer Account
  * Create and manage Apple Pay certificates
  * Successfully verify your domain with Apple
  * Build the Apple Pay session and securely pass the encrypted payment token to EdfaPay

**EdfaPay's Role:**

  * Provides backend guidance and API specifications for processing the Apple Pay token
  * Validates transactions via the S2S Sale API

> Suited for experienced merchants or partners who prefer to build custom UI
> and payment workflows.

###

Security and Compliance

EdfaPay ensures all Apple Pay transactions are rigorously tokenized and
encrypted, maintaining full PCI-DSS compliance.

  * **Checkout Integration:** Secure hashing is managed entirely within EdfaPay's robust infrastructure, minimizing your security burden.
  * **Embedded Integration (S2S):** Merchants are responsible for diligently implementing the Apple Pay session in strict adherence to Apple's security guidelines.

###

Explore Apple Pay Sub-Categories

Apple Pay Configuration (Checkout): Learn how to set up Apple Pay using the
Checkout integration.

Apple Pay UI Integration (Checkout): Integrate the Apple Pay button and manage
the user interface for Checkout.

Apple Pay S2S Integration (Embedded): Detailed guide for Server-to-Server
(S2S) integration, including custom UI and backend processing.

Apple Pay Security & Hashing: Understand the security measures and hashing
mechanisms for Apple Pay transactions.

Troubleshooting: Find solutions to common issues and problems encountered
during Apple Pay integration.

> 📘
>
> **Important Notes** Apple Pay cannot be tested in Sandbox — the button
> appears only in Production.

> **For S2S, if your certificate expires, Apple Pay will stop working until
> renewed.**

Updated 3 months ago

E-Invoice System

Apple Pay Configuration

Ask AI



--- URL: https://docs.edfapay.com/docs/partner-configuration-requirements ---

#

Partner Configuration Requirements

##

Overview

This document outlines the mandatory technical requirements and configuration
parameters required for successful EdfaPay system integration. All specified
requirements must be fulfilled before integration deployment.

##

1\. Technical Infrastructure Requirements

###

1.1 Security Certificate Configuration

####

SSL Certificate Specification

Parameter| Requirement  
---|---  
**Format**|  Valid SSL Certificate (X.509 format)  
**Version**|  SSL 3.0 or higher  
**Key Length**|  Minimum 2048-bit RSA  
**Certificate Authority**|  Must be issued by a recognized CA  
**Validity Period**|  Minimum 12 months remaining  
  
> **Critical Requirement:** TLS certificates are not acceptable. Only SSL
> certificates will be processed by the integration system.

###

1.2 Network Configuration

####

Firewall Requirements

  * Whitelist EdfaPay public IP addresses (provided during onboarding)
  * Configure inbound/outbound rules for HTTPS traffic (port 443)
  * Ensure NAT traversal compatibility if applicable

####

Domain Configuration

  * Provide fully qualified domain name (FQDN) for integration endpoint
  * Ensure DNS resolution is properly configured
  * Verify domain ownership and control

####

Geographic Configuration

  * Specify operational territories/countries
  * Define regional compliance requirements
  * Configure appropriate data residency settings

##

2\. System Branding Configuration

###

2.1 Visual Identity Parameters

Color SpecificationsLogo Requirements

####

Primary Brand Colors

  * **Primary color:** Hexadecimal format (#RRGGBB)
  * **Secondary color:** Hexadecimal format (#RRGGBB)
  * **Accent colors:** Additional hex values if required

####

Color Profile Compliance

  * RGB values for digital display
  * Ensure WCAG 2.1 contrast ratios are met

##

3\. Communication Protocol Configuration

###

3.1 Email and SMS Template Configuration

Configuration Template Process

####

Required Actions:

**Step 1: Download Configuration Template**

  * Access the Excel configuration file: Email & SMS Configuration Template

**Step 2: Complete Required Fields**

  * Sender information and authentication details
  * Message templates and localization settings
  * Delivery preferences and retry parameters
  * Compliance and opt-out configurations

**Step 3: Template Submission**

  * Submit completed template to: techsupport@edfapay.com
  * Include subject line: "Partner Configuration - [Company Name]"
  * Allow 24-48 hours for processing confirmation

##

4\. Integration Timeline and Process

###

4.1 Implementation Phases

Phase| Description| Activities  
---|---|---  
**Phase 1**|  Requirements Validation| Technical requirements verification,
Documentation review and approval, Initial configuration setup  
**Phase 2**|  System Configuration| SSL certificate installation and
validation, Network connectivity testing, Branding implementation and testing  
**Phase 3**|  Communication Setup| Template configuration deployment, Message
delivery testing, Compliance verification  
**Phase 4**|  Go-Live Preparation| Final system validation, Production
credentials provisioning, Monitoring and alerting configuration  
  
##

5\. Support and Contact Information

###

5.1 Technical Support Channels

####

Primary Contact

Channel| Details  
---|---  
**Email**| techsupport@edfapay.com  
  
####

Documentation and Resources

  * Technical documentation portal access provided upon partnership agreement
  * API specifications and integration guides are available post-configuration
  * System status and maintenance notifications via dedicated channels

##

6\. Prerequisites Checklist

###

6.1 Pre-Integration Requirements

Before initiating the integration process, ensure the following items are
prepared:

  * Valid SSL certificate with minimum 12 months validity
  * Network infrastructure configured for IP whitelisting
  * Domain ownership verified and DNS configured
  * Brand assets prepared in specified formats
  * Communication template completed and submitted
  * Regional compliance requirements documented

> **Integration Ready:** Once all prerequisites are completed, contact
> technical support to initiate the configuration process.

Updated about 2 months ago

Edfapay White Label Solutions

Partner Features

Ask AI



--- URL: https://docs.edfapay.com/docs/system-device-requirements ---

To ensure a smooth experience with EdfaPay SoftPOS, merchants must meet the
following system and device requirements. These requirements ensure
compatibility, reliability, and secure transaction processing.

###

Supported Operating System

  * Android 9 or higher is required.
  * Devices must have access to the Google Play Store for updates.
  * Regular system updates are strongly recommended for performance and security

###

Device Requirements

  * **NFC Support** : The device must support Near Field Communication (NFC) to accept contactless card payments.
  * **Camera** : A rear camera is required for QR code payment acceptance.
  * **RAM** : Minimum of 3 GB RAM for stable app performance.
  * **Processor** : ARM-based processor with at least 1.8 GHz.
  * **Storage** : At least 200 MB free storage space for the application and its data.

###

Connectivity

  * **Internet Access** : A stable 4G/5G mobile data connection or Wi-Fi network is required.
  * **Secure Network** : Public or unsecured Wi-Fi networks are discouraged.

###

Additional Requirements

  * **Google Play Services** must be available and up to date.
  * The device should not be **rooted **or **jailbroken** , as this compromises security.
  * A valid Google Account is required to download and update the application from the Play Store.

Updated 3 months ago

Partner

Terminal

Ask AI



--- URL: https://docs.edfapay.com/docs/partner-features ---

#

Partner Features Overview

Welcome to the EdfaPay Partner Portal! This comprehensive guide covers all the
powerful features available to partners, organized by functionality to help
you manage your merchant network efficiently.

Merchant Management

Create, view, edit, and support merchants under your hierarchy with full
management capabilities.

Financial Reports

Access detailed transaction and settlement reports for all your merchants with
advanced filtering.

Partner Settings

Customize your branding, configure hostname settings, and personalize the
interface appearance.

Registration Management

Review and manage merchants who register through your partner hostname.

##

Merchant Management

Complete Merchant Management Tools

Partners have full control over their merchant network with comprehensive
management capabilities.

###

Key Features

Add MerchantView & MonitorEdit DetailsTechnical Support

**Create New Merchants**

  * Create new merchants directly from the Partner Dashboard
  * Streamlined onboarding process
  * Instant activation capabilities
  * Bulk merchant creation options

> ✨
>
> **Pro Tip** : Use bulk creation for efficient onboarding of multiple
> merchants at once.

##

Financial Reports

Comprehensive Financial Analytics

Access detailed financial data and analytics for all merchants under your
management.

###

Transaction Reports

**Monitor All Payment Activities**

**Core Features**

  * View transaction history of all associated merchants
  * Real-time transaction monitoring
  * Comprehensive payment method breakdown
  * Success rate analytics

**Advanced Filtering**

  * Filter by date range
  * Filter by transaction status
  * Filter by specific merchant
  * Filter by payment method type
  * Export filtered results in multiple formats

###

Settlement Reports

**Track Merchant Payouts**

  * Generate settlement reports for all merchants or selected merchants
  * Choose custom date ranges
  * Download detailed settlement reports
  * Automated report scheduling
  * Settlement status tracking

> 📊
>
> **Analytics Insight** : Settlement reports help you track cash flow patterns
> and optimize payout schedules for your merchants.

##

Partner Settings

Branding & Configuration

Customize your partner portal to match your brand identity and business
requirements.

###

Basic Information Setup

**Required Partner Information**

Field| Purpose| Requirements  
---|---|---  
Partner Hostname| Partner's domain used for hosted pages & online
registrations| Must be a valid domain  
Name (EN)| Partner name in English| Required for English interface  
Name (AR)| Partner name in Arabic| Required for Arabic interface  
  
###

Theme & Branding Customization

Color SchemeBrand Assets

**Theme Colors Configuration**

  * **Primary Color** : Main brand color used throughout the interface
  * **Secondary Color** : Accent color for buttons and highlights

> 🎨
>
> **Color Format** : Primary and Secondary colors must be entered in hex color
> format (e.g., #FF6B35, #004E64)

**Color Usage Guidelines:**

  * Primary colors appear in headers, navigation, and main buttons
  * Secondary colors are used for accents, links, and hover states
  * Ensure sufficient contrast for accessibility compliance

##

Online Registration Management

Registration Review & Control

Manage and review all merchant registrations that come through your partner
hostname.

###

Registration Capabilities

**Complete Registration Oversight**

**View Registrations**

  * All registered merchants linked to partner hostname
  * Registration status tracking
  * Application timeline view
  * Bulk registration management

**Edit & Review**

  * Edit merchant registration data
  * Review uploaded documents
  * Review uploaded certificates
  * Approve or request modifications

###

Document Management

**Comprehensive Document Review**

  * **Document Verification** : Review all uploaded business documents
  * **Certificate Validation** : Verify business certificates and licenses
  * **Compliance Checking** : Ensure all required documents are complete
  * **Status Updates** : Communicate approval status to merchants

> 📋
>
> **Compliance Note** : Thorough document review ensures regulatory compliance
> and reduces onboarding risks.

##

Getting Started

Setup Guide

Start by configuring your basic information and branding settings to
personalize your partner portal.

Add Your First Merchant

Use the merchant management tools to onboard your first merchant and explore
the platform features.

Explore Reports

Familiarize yourself with the reporting dashboard to track performance and
financial data.

> 🎯
>
> **Ready to Begin?** Your partner dashboard provides access to all these
> features. Start with the basic settings configuration and gradually explore
> the advanced features as your merchant network grows.

Updated about 2 months ago

Partner Configuration Requirements

Merchant Registration

Ask AI



--- URL: https://docs.edfapay.com/docs/sandbox-environment ---

EdfaPay provides a dedicated sandbox environment, an essential tool for
merchants to develop and rigorously test their payment integrations before
deploying to a live production setting. This simulated environment accurately
mirrors all core functionalities of our payment platform, allowing for
comprehensive testing without processing real transactions.

###

Purpose of the Sandbox

The EdfaPay sandbox environment empowers you to:

  * **Simulate Transactions:** Test various transaction types, including sale and refund requests.
  * **Validate Flows:** Verify 3D Secure redirection processes and other payment workflows.
  * **Explore Outcomes:** Simulate diverse transaction results, such as SUCCESS, DECLINED, and REDIRECT, to understand system responses.
  * **Test Webhooks:** Evaluate Webhook callback behavior and ensure proper notification delivery.
  * **Master Hash Generation:** Safely implement and troubleshoot your hash generation logic.

###

Sandbox Test Account Credentials

Utilize the following sample credentials for testing within the EdfaPay
sandbox environment:

Field| Value  
---|---  
`client_key`| `sandbox-client-key`  
`password`| `sandbox-secret-password`  
`card_number`| `5123450000000008` _(MasterCard)_  
`exp_month`| `01`  
`exp_year`| `2039`  
`cvv`| `100`  
`payer_email`| `testuser@edfapay.com`  
  
> **Important:** These test credentials are _exclusively_ valid within the
> sandbox environment. For live production use, a complete onboarding process
> and unique credential generation are required.

###

Hash Calculation in the Sandbox

Even within the sandbox environment, all API requests must be authenticated
using a generated hash. The hash generation process adheres to the same rules
as the production environment:

JavaScript

    
    
    const ReverseString = str => [...str].reverse().join('');
    const final = (ReverseString(email) + password + ReverseString(cardNumber.substr(0, 6) + cardNumber.substr(-4))).toUpperCase();
    const finalHash = CryptoJS.MD5(final).toString();

> 📘
>
> ###
>
> **Key Sandbox Notes**
>
>   * **No Live Data:** Never use live card data or real sensitive information
> in the sandbox.
>   * **Use Test Credentials:** Always use your **test client_key** and the
> sandbox hash key.
>   * **Webhook Testing:** You can simulate webhook behavior by configuring
> your own endpoint or by leveraging third-party tools like Webhook.site for
> inspection.
>

Updated 3 months ago

Merchant Registration

Edfapay SandBox Dashboard

Ask AI



--- URL: https://docs.edfapay.com/docs/tamara ---

##

Tamara Payment Method

EdfaPay supports **Tamara** , a Buy Now, Pay Later (BNPL) payment method that
allows customers to split their payments or pay later through a smooth and
secure checkout experience.

Tamara is available through **EdfaPay Hosted Checkout** and appears
automatically as a payment option once enabled.

####

Benefits of Tamara:

  * Flexible Buy Now, Pay Later payment options for customers.
  * Improved checkout experience with fewer drop-offs.
  * Increased conversion rates and customer satisfaction.
  * No additional payment method flow required after activation.

####

How to Enable Tamara:

To enable Tamara, contact EdfaPay’s Operations Team for activation.

Contact: onboarding@edfapay.com

**Once Tamara is activated:**

  * It automatically appears in checkout.
  * No extra integration is needed.
  * Monitor transactions via the EdfaPay Dashboard.

###

Developer Integration Notes

To ensure Tamara appears correctly during checkout, your payment request must
include itemized order details for the purchased products or services.

> 📘
>
> For full technical details, request parameters, examples, hash generation,
> and callback handling, refer to the Tamara API Reference:
>
> 👉 Tamara API – Initiate Hosted Checkout

###

How to Find Tamara Transactions in the Dashboard

  1. Navigate to transactions and select the transaction method.

  1. From the dropdown list

  1. Select Tamara.

> 🚧
>
> **Important Notes**
>
>   * EdfaPay manages all setup and reconciliation through the Dashboard.
>   * All refund operations must be done directly through the merchant
> dashboard; they cannot be performed via the API.
>   * Refunds processed via Tamara are always fully captured.
>

Updated 20 days ago

International payment

Compliance & Secuirty

Ask AI



--- URL: https://docs.edfapay.com/docs/partner ---

The Partner Page is designed to give our partners full control over their
white-labeled platform. Partners can onboard and manage their merchants,
branches, and terminals, while gaining powerful insights into performance
through the dashboard.

With white-label customization, email and SMS configurations, role management,
and visual branding options, the Partner Page ensures each partner can tailor
the experience to their unique needs.

###

Merchant, Branch & Terminal Management

From the Partner Page, partners can:

  * Add and manage merchants.
  * Create branches to track performance and monitor transactions on a geographic view.
  * Assign and manage terminals per branch or merchant.

These capabilities give partners full visibility across their ecosystem.

###

Insights & Ranking

The Overview Dashboard provides real-time insights and rankings, including:

  * Performance summaries across all merchants.
  * Identification of top-performing merchants.
  * Rankings to highlight merchants generating the strongest results.

This enables partners to make data-driven decisions and support their
merchants effectively.

###

Role & Permission Management

Partners can create and adjust role permissions for their merchants and users.
This provides flexibility in granting access levels and ensuring secure
control across the platform.

###

White Label Management

Partners can fully customize their white-labeled dashboard to match their
brand identity. This includes:

####

Email Configuration

Partners can configure their own SMTP settings to control all outgoing emails
to their merchants. Required fields include:

  * Mail From
  * Company Name
  * SMTP Username
  * SMTP Host
  * SMTP Port
  * SMTP Password

A **test option** is available so partners can verify the setup before sharing
it with their merchants.

####

SMS Configuration

Partners can configure their own SMS settings using our supported third-party
providers:

  * **Teqniat**
  * **Bab**

To enable SMS, partners must contact the Onboarding Team at: 📧
Onboarding@edfapay.com

Our team will provide the necessary credentials for configuration.

####

Theme Customization

  * **Theme Colors** : Define primary colors, sidebar colors, and sidebar icon colors for both **light** and**dark modes**.
  * **Logos & Images**: Upload custom assets such as: 
    * **Login logo**
    * **Login carousel images**
    * **Dashboard icon**
    * **Loader logo**
    * **Tab logo**

Updated 3 months ago

Edfapay Production Dashboard

System & Device Requirements

Ask AI



--- URL: https://docs.edfapay.com/docs/terminal ---

A Terminal is a virtual POS device that allows a merchant or user to process
card transactions through the EdfaPay SoftPOS system. Each terminal has unique
identifiers provided by SAMA (Saudi Central Bank) and can be configured with
specific payment methods and features.

###

Creating a Terminal(Single)

When creating a terminal, you may need to select the merchant or user (if you
are setting it up on their behalf). If you are logged in as the merchant, the
terminal will be added directly to your account.

Then enter the following details:

Field| Required| Description  
---|---|---  
**Branch**|  Optional| Identifies the branch where the terminal will be used
(if the merchant has multiple locations).  
**TSRM ID**|  Mandatory| A 6-digit identifier provided by SAMA (Saudi Central
Bank). It is used to register and authenticate the terminal in the national
payment network.  
**Terminal ID**|  Mandatory (16 digits)| A unique 16-digit identifier provided
by SAMA (Saudi Central Bank). It is used to uniquely identify the merchant’s
terminal during every transaction.  
  
###

Bulk Import Terminals

Instead of adding terminals one by one, you can import multiple terminals at
once by uploading a CSV/Excel file.

**Steps:**

  1. Go to **Terminal Options → Add Multiple Terminals → Download Template**.
  2. Open the template file and fill in the required details for each terminal: 
     * **providerTid** A numeric field that represents the provider’s terminal ID. Each entry should be unique and consist only of numbers.
     * **trsm** A numeric field that represents the internal terminal identifier. This value is also unique and should be entered as numbers only.
  3. Save the file and upload it back in the same section.
  4. The system will validate the file and create all listed terminals in bulk.

> 🚧
>
> Ensure that TSRM ID and Terminal ID match exactly what was provided by SAMA
> (Saudi Central Bank).

###

Payment Methods

You can enable or disable which Card Schemes the terminal will accept:

  * **American Express**
  * **Visa**
  * **Mastercard**
  * **Maestro**
  * **Mada**
  * **UnionPay**
  * **Discover**

###

Features

You can also control which transaction features are available for this
terminal:

  * **Purchase** – Standard payment transaction.
  * **Refund** – Return of funds to the customer.
  * **Reverse** – Cancel a transaction before settlement.
  * **Reconciliation** – End-of-day balancing and reporting.

Updated 3 months ago

System & Device Requirements

FEATURES

Ask AI



--- URL: https://docs.edfapay.com/docs/production-environment ---

This guide provides essential information for seamlessly preparing your
EdfaPay SoftPOS deployment for the production environment. It outlines key
requirements, critical security guidelines, and important considerations to
ensure a smooth and secure launch.

###

Requirements for Production Readiness

Before enabling EdfaPay SoftPOS in production, ensure the following
prerequisites are met:

  1. **Merchant Registration Completion** Confirm with the EdfaPay onboarding team that all necessary merchant registration steps have been finalized.
  2. **QR Code Activation & SDK Token Generation** Each merchant device must be activated securely using the QR code provided in the EdfaPay Dashboard. 
     * During activation, the system generates a unique SDK token for secure communication.
     * This replaces the need for traditional client keys or passwords.
  3. **Production Dashboard Access** Merchants and partners must have access to the live EdfaPay Dashboard: 
     * Production URL: Dashboard
  4. **Domain Whitelisting (for White-Label Partners)** If you are deploying SoftPOS under a white-label setup, provide your production domains or IPs to EdfaPay. 
     * This ensures secure traffic flow and prevents unauthorized requests.

###

Security Best Practices

Adhering to these security guidelines is crucial for protecting sensitive data
and maintaining compliance:

  * **Secure Device Use** Ensure that only NFC-enabled Android devices running the supported OS version are used.

  * **Secure Communication** All device-to-server and dashboard communications are encrypted and must be performed over **HTTPS**.

  * **Credential & Token Protection** Never log, store, or expose SDK tokens, QR codes, or other sensitive identifiers in unsecured environments.

  * **Compliance Standards**

EdfaPay SoftPOS is fully aligned with **PCI MPoC** , **EMVCo** , and
**NFC/contactless** requirements. Ensure merchants operate only within these
compliant environments.

###

Important Considerations

> ####
>
> Device Compatibility
>
> Verify that all merchant devices meet the minimum technical requirements
> (NFC-enabled, supported Android OS, Google Play Services available).
>
> ####
>
> White-Label Branding
>
> If using SoftPOS as a white-label solution, coordinate with the EdfaPay team
> to align branding, domains, and dashboard configurations.
>
> ####
>
> Ongoing Monitoring
>
> Use the EdfaPay Dashboard to continuously monitor device activity,
> transactions, and settlements to ensure smooth business operations.

Updated 3 months ago

Merchant Registration

Edfapay Production Dashboard

Ask AI



--- URL: https://docs.edfapay.com/docs/payment-methods ---

##

Payment Methods

Discover the payment methods supported by **Edfapay** , including their Arabic
names.

Payment Method Name| Description  
---|---  
VISA| A globally accepted credit and debit card network.بطاقة فيزا – مقبولة
عالميًا.  
MASTER| A major global payment network for credit and debit cards.بطاقة
ماستركارد – شبكة دفع عالمية.  
MADA| A local Saudi payment network for debit cards issued by Saudi banks.مدى
– شبكة دفع محلية في السعودية.  
Apple Pay| Apple's mobile wallet and digital payment service.أبل باي – وسيلة
دفع عبر أجهزة أبل المحمولة.  
AMEX| American Express, known for credit and charge cards.أمريكان إكسبريس –
بطاقة ائتمان دولية.  
Tamara| A Buy Now, Pay Later (BNPL) service allowing customers to split
payments.تمارا – خدمة اشتر الآن وادفع لاحقًا.  
  
###

Payment Method Availability

Default availability of payment methods depends on your **EdfaPay** account
type and agreement. Core methods like credit/debit cards and Apple Pay are
generally enabled for all accounts.

To enable additional methods (e.g., Tamara, STC Pay, Sadad), please contact
our **Operations Team** for assistance.

> Note: We are continually expanding our payment method offerings, with new
> options planned for future rollouts.

Updated 3 months ago

Go Live CheckList

E-Invoice System

Ask AI



--- URL: https://docs.edfapay.com/docs/production-environment-1 ---

This guide provides essential information for seamlessly transitioning your
EdfaPay integration from the sandbox to the production environment. It
outlines key requirements, critical security guidelines, and important
considerations to ensure a successful and secure launch.

###

Requirements for Production Readiness

Before deploying to the production environment, ensure the following
prerequisites are met:

  1. **Merchant Registration Completion:** Confirm with the EdfaPay onboarding team that all necessary merchant registration steps have been finalized.
  2. **Production Credentials Issuance:** You must have received your live production credentials, which include: 
     * client_key
     * password
  3. **Production Webhook URL Configuration:** Update your live webhook URL within your EdfaPay dashboard. Navigate to: **Portal → Settings → Webhook Settings**.
  4. **Domain Whitelisting:** Provide your production domains or IP addresses to EdfaPay to prevent request blocking and ensure uninterrupted service.

###

Security Best Practices

Adhering to these security guidelines is crucial for protecting sensitive data
and maintaining the integrity of your integration:

  * **Secure Communication:** Always use HTTPS for all API endpoints and Webhook URLs.
  * **Request Authentication:** Ensure all requests include the securely generated hash.
  * **Credential Protection:** Never log, store, or expose sensitive credentials such such as passwords, full card numbers, or CVVs in unsecured environments.

###

Key Differences: Sandbox vs. Production

Understanding the distinctions between the sandbox and production environments
is vital for a smooth transition:

Feature| Sandbox| Production  
---|---|---  
Environment URL| `https://sandbox.edfapay.com/`| `https://api.edfapay.com/`  
Transactions| Simulated only| Real transactions involving actual funds  
Card Data| Test cards only| Requires valid, live card information  
Hash Key| Test secret| Live secret issued by the onboarding team  
  
###

Important Considerations

> ####
>
> Webhook Endpoint Update
>
> Ensure your Webhook endpoint is updated for the production environment to
> receive real-time transaction updates. Failure to do so will prevent receipt
> of these updates.
>
> ####
>
> Communication of Changes
>
> Proactively communicate any modifications to callback URLs or integration
> behavior to the EdfaPay onboarding or support team.
>
> ####
>
> Final Sandbox Validation
>
> Conduct a comprehensive final test in the sandbox environment before
> switching to production to validate the latest integration build and ensure
> all functionalities work as expected.

Updated 3 months ago

Edfapay SandBox Dashboard

Edfapay Production Dashboard

Ask AI



--- URL: https://docs.edfapay.com/docs/overview ---

###

Overview

The EdfaPay Embedded Integration S2S (Server-to-Server) provides a robust
solution for merchants to securely capture payment details directly within
their customized checkout environments. This method facilitates the secure
transmission of sensitive payment data from your backend server straight to
EdfaPay's API.

This integration grants unparalleled control over the user experience while
upholding stringent security standards through server-side hash authentication
and strict PCI-compliant data handling protocols.

###

Embedded Integration

Complete reference for the Embedded integration API endpoints and operations

Embedded Card Payment SALE

Process secure card payments directly within your custom checkout environment
using a **POST** request.

Transaction Details

Access comprehensive information for all your payment transactions via a
**POST** request.

Captures

Finalize authorized payments by capturing the pre-approved funds with a
**POST** request.

Refunds

Initiate full or partial refunds for processed transactions through a **POST**
request.

Recurring Payments

Set up and manage automated recurring payments for subscriptions and
installments using a **POST** request.

###

Integration Workflow

This section outlines the step-by-step process for integrating EdfaPay's
Embedded S2S solution.

**1\. Collect Payment Data** Securely gather essential card and customer
details via your custom checkout form.

**2\. Submit Transaction Request** Your backend server sends a secure `SALE`
request to the EdfaPay S2S endpoint (`https://api.edfapay.com/payment/post`).
This `POST` request must include all necessary transaction parameters, such as
card details, order amount, currency, and a cryptographically generated hash.

**3\. Handle 3D Secure (Conditional)**

  * If 3D Secure authentication is required, EdfaPay will respond with a `redirect_url` and a `Base64-encoded payload`.
  * Your application (web or mobile) must then display the 3DS authentication challenge within a WebView or an iframe using the provided `redirect_url`.

**4\. Receive Transaction Outcome** Upon successful authentication, EdfaPay
redirects the user back to your designated `term_url_3ds` and simultaneously
dispatches a webhook notification containing the definitive transaction
status.

###

Core Advantages

  * **Complete Checkout Control** : Maintain full autonomy over your customer's checkout journey, eliminating external redirects.
  * **Seamless Integration** : Achieve a clean, cohesive, and effortless integration with your existing web or mobile platforms.
  * **Enhanced Security** : Card data is processed with utmost security via S2S communication, reinforced by robust hash verification to guarantee data integrity and authenticity.
  * **Flexible Payment Operations** : Supports a diverse range of payment functionalities, including secure tokenization, recurring payment profiles, and authorization-capture workflows.

###

Essential Integration Components

  * **API Endpoint** : All S2S requests are directed to `https://api.edfapay.com/payment/post`.
  * **Request Method** : All requests must be **POST** requests, formatted as `multipart/form-data`.
  * **Mandatory Fields** : Each request must precisely include fields such as `action`, `client_key`, `order_id`, `order_amount`, `order_currency`, comprehensive card data, payer information, and a unique transaction hash.
  * **3D Secure Implementation** : Should 3DS be triggered, your application is responsible for presenting EdfaPay's authentication page within an iframe or a WebView.

> 📘
>
> ###
>
> **Important Note on Hash Generation**
>
> A cryptographically secure hash **must** be generated for every transaction
> request. This hash is formulated using your unique secret key, the payer's
> email address, and the masked card PAN, which collectively ensures the
> authenticity and integrity of the request, safeguarding against unauthorized
> alterations.

> ❗️
>
> ###
>
> **Security & Validation Advisory**
>
> All card information must be collected securely within your frontend and
> subsequently transmitted **exclusively** to your backend server. It is
> paramount that this sensitive data is **never** submitted directly from the
> frontend to EdfaPay.

###

3D Secure & Webhook Integration Details

When 3D Secure authentication is initiated, the EdfaPay API response will
include both a `redirect_url` and `redirect_params.body`.

  * **Displaying the 3DS Challenge** : 
    * You are required to `POST` the `redirect_params.body` (a `BASE64_ENCODED_STRING`) to the `redirect_url`.
    * The expected structure for this POST request body is: 

JSON

          
          {
           "body": "BASE64_ENCODED_STRING"
          }

    * The response from this POST operation will be a rendered HTML page—the 3DS authentication challenge—which you must display within either a WebView or an iframe.

> 🚧
>
> ###
>
> **Critical Alert: Do Not Alter 3DS Payload**
>
> It is absolutely crucial that you do **not** decode or modify the
> Base64-encoded `body` received from EdfaPay. This payload is
> cryptographically signed and must be used precisely as provided to guarantee
> proper and secure authentication.

  * **Webhooks for Transaction Status** : 
    * Webhooks are an **indispensable** component for this integration.
    * Your backend system **must** be diligently configured to receive and process payment status updates dispatched from EdfaPay. These webhooks serve as critical notifications for the final transaction status (e.g., successful, declined, refunded).
    * **Testing Tip** : During staging and development phases, leverage tools suchs as Webhook.site to effectively simulate and inspect the behavior of incoming callbacks.

Updated 3 months ago

EdfaPay Payment Gateway

Edfapay Partner

Ask AI



--- URL: https://docs.edfapay.com/docs/testing-guide ---

##

Testing Guide

Before launching, merchants must integrate and thoroughly test their systems
within the EdfaPay Sandbox Environment. This environment allows you to
validate your integration, test payment flows, and handle callbacks without
affecting real transactions.

###

Sandbox Base URL

cURL

    
    
    https://apidev.edfapay.com

All test requests should be directed to this endpoint. When transitioning to a
live environment, simply update the base URL to:

cURL

    
    
    https://api.edfapay.com

###

Sandbox Credentials

Upon registration, you will receive a unique Sandbox Merchant Key and Merchant
Password for authentication. These credentials are distinct from your
Production credentials. If you have not yet received your sandbox details,
please contact EdfaPay Support.

> Email: techsupport@edfapay.com

###

Test Cards

To simulate various payment scenarios, we provide a comprehensive set of dummy
Card Numbers.

> ⚠️
>
> Note: Apple Pay cannot be tested in the sandbox environment. A production
> environment with a valid Apple Merchant ID is required for Apple Pay
> testing.

###

Importing Postman Collection

To streamline your testing process:

  1. **Download:** Obtain the EdfaPay Postman Collection, which will be provided by our team.
  2. **Import:** Open Postman, navigate to "Import," and upload the downloaded collection JSON file.
  3. **Configure:** Update the Environment Variables within Postman with your sandbox merchant credentials.
  4. **Switch Environments:** Easily toggle between Sandbox and Production environments by simply updating the base URL.

###

What to Test

We recommend testing the following key functionalities:

  * Sale (S2S) payments
  * Refunds
  * Webhook callbacks
  * Invoice creation and payment
  * Error handling (e.g., decline codes)

###

Go Live Checklist

To ensure a smooth transition to the production environment, complete the
following steps:

  1. **Update Base URL:** Switch from the Sandbox base URL to the Production base URL.
  2. **Replace Credentials:** Update your system with production credentials, replacing the sandbox ones.
  3. **Verify Callbacks & Redirections:** Confirm that all callback URLs and success/failure redirection pages are functioning correctly.
  4. **Live Transaction:** Perform a small live transaction with a real card to ensure final confirmation of your integration.

> ⚡
>
> This guide empowers merchants to thoroughly test their integration, ensuring
> confidence before going live with the EdfaPay platform.

Updated 3 months ago

EdfaPay Refund Integration

Test cards

Ask AI



--- URL: https://docs.edfapay.com/docs/transaction-decline-codes ---

When a transaction fails, our payment gateway or the card-issuing bank
provides a specific decline code. This document offers a categorized reference
of the most common decline codes, their descriptions, and actionable insights
to assist with effective troubleshooting.

###

Customer/Cardholder Related Issues

These errors indicate problems directly associated with the cardholder's card
or account.

Code| Description| What It Means  
---|---|---  
01| Refer to Card Issuer| The cardholder must contact their bank for
authorization.  
04| Pick-Up Card| The card has been reported lost or stolen; the merchant
should retain it if possible.  
05| Do Not Honor| The issuing bank declined the transaction for an unspecified
reason.  
41| Lost Card| The card has been reported lost; reject the transaction and
retain the card if possible.  
43| Stolen Card| The card has been reported stolen; reject the transaction and
retain the card if possible.  
51| Insufficient Funds| The customer's account has an inadequate balance for
the transaction.  
54| Expired Card| The card is no longer valid due to its expiration date.  
55| Incorrect PIN| The Personal Identification Number (PIN) entered is
incorrect.  
75| PIN Tries Exceeded| The maximum number of incorrect PIN attempts has been
exceeded.  
  
###

Bank-Side or Issuer Restrictions

These errors are a result of limits, rules, or security measures imposed by
the card-issuing bank or payment scheme.

Code| Description| What It Means  
---|---|---  
57| Transaction Not Permitted to Cardholder| The cardholder is not authorized
to perform this type of transaction.  
61| Exceeds Withdrawal Amount Limit| The transaction amount exceeds the
maximum allowed by the card.  
62| Restricted Card| The card is blocked or restricted for this specific type
of transaction.  
65| Exceeds Withdrawal Frequency Limit| The card has exceeded its allowed
transaction frequency within a short period.  
87| No Cashback Allowed| Only purchase transactions are permitted; cashback is
not allowed.  
  
###

Gateway / System Errors

These issues stem from internal system problems or technical faults
encountered during transaction processing.

Code| Description| What It Means  
---|---|---  
06| Error| A general processing error occurred.  
12| Invalid Transaction| The transaction type or associated data is incorrect.  
13| Invalid Amount| The transaction amount is invalid or not allowed.  
14| Invalid Card Number| The card number format is incorrect or invalid.  
80| System Not Available| The payment gateway is temporarily unavailable.  
91| Issuer System Inoperative| The card-issuing bank's system is currently
down.  
92| Unable to Route Transaction| The gateway cannot establish a connection to
the appropriate payment processor.  
94| Duplicate Transaction| The same transaction has already been submitted and
processed.  
96| System Error| An unspecified technical failure occurred within the system.  
  
###

Merchant or Terminal Issues

These codes indicate problems related to the merchant's account,
configuration, or the processing terminal.

Code| Description| What It Means  
---|---|---  
03| Invalid Merchant| The merchant credentials are invalid or the account is
not active.  
58| Transaction Not Allowed to Terminal| The merchant's account or terminal is
not configured to process this type of transaction.  
  
###

3D Secure (3DS) Authentication Issues

These responses pertain to the 3D Secure authentication step, which requires
the customer to verify their identity (e.g., via OTP or bank app). A failed or
incomplete authentication can lead to a payment decline, even if the card is
otherwise valid.

Status| What It Means  
---|---  
Authentication Pending| The customer did not complete the 3DS verification;
the payment is awaiting completion or will time out.  
Authentication Failed| The customer failed the 3DS verification (e.g.,
incorrect OTP, or authentication rejected by the issuer).  
Authentication Rejected| The card issuer rejected the authentication attempt.  
  
###

Reference Documentation

This document serves as a comprehensive reference for **ISO 8583 decline
response codes** , detailing their descriptions and explanations. It is
designed to assist in understanding why a transaction may be declined by a
card issuer or the payment system.

📄 View Full Decline Response Codes PDF

Updated 3 months ago

Fraud Plan

3D Secure

Ask AI



--- URL: https://docs.edfapay.com/docs/testing-webhooks ---

To test your EdfaPay webhook integration, use Webhook.site, a free tool that
provides a unique URL to receive and inspect HTTP POST requests. This helps
verify EdfaPay webhook payloads before production.

###

How to Use Webhook.site for Testing

  1. Go to https://webhook.site. A unique URL will be generated (e.g., `https://webhook.site/1234-abcd-5678-efgh`).
  2. Copy this URL and paste it into your EdfaPay Dashboard settings: `Settings > Webhook > Webhook URL`.
  3. Perform a test transaction in your sandbox or production environment.
  4. Monitor the Webhook.site page to see headers, body/payload, request method (POST), and timestamps.

###

What to Check on Webhook.site:

Confirm| Why It’s Important  
---|---  
Payload matches your docs| Validate data structure.  
Correct `action` / `status`| Check transaction flow.  
Correct `hash` field| Validate security logic.  
Response HTTP 200| Confirm webhook is successful.  
  
> 📘
>
> ###
>
> Important Reminder
>
> Webhook.site is for testing only. In production, your webhook endpoint
> should be on your secure server, properly handling authentication and hash
> validation.

Updated 3 months ago

Webhook Payloads

Webhook Validation

Ask AI



--- URL: https://docs.edfapay.com/docs/test-cards ---

######

To simulate various payment outcomes, EdfaPay provides a set of test card
numbers that can be used in the sandbox environment.

> ❗️
>
> Test cards will only work in sandbox mode and will not trigger any real
> financial transactions.

###

Credit/Debit Cards

Card type| Card Number  
---|---  
Mastercard| 5123 4500 0000 0008  
Mastercard| 5111 1111 1111 1118  
Visa| 4508 7500 1574 1019  
Visa| 4111 1111 1111 1111  
American Express| 3456 7890 1234 564  
American Express| 3714 4963 5398 431  
  
###

Expiry Date Outcomes:

Expiry Date| Gateway Code  
---|---  
01 / 39| APPROVED  
05 / 39| DECLINED  
04 / 27| EXPIRED_CARD  
08 / 28| TIMED_OUT  
01 / 37| ACQUIRER_SYSTEM_ERROR  
02 / 37| UNSPECIFIED_FAILURE  
05 / 37| UNKNOWN  
  
###

CVV/CSC Responses:

Test CVV responses with the following values:

####

Visa / Mastercard:

CVV Value| Response Code| Description  
---|---|---  
100| MATCH| CVV is correct  
101| NOT_PROCESSED| Skipped check  
102| NO_MATCH| CVV incorrect  
  
####

American Express:

CVV Value| Response Code| Description  
---|---|---  
1000| MATCH| CVV is correct  
1010| NOT_PROCESSED| Skipped check  
1020| NO_MATCH| CVV incorrect  
  
Updated 3 months ago

Testing Guide

Go Live CheckList

Ask AI



--- URL: https://docs.edfapay.com/docs/user-roles-permissions ---

This page provides a comprehensive guide to user roles, their permissions, and
step-by-step instructions for adding new users. Understanding these roles is
essential for maintaining proper access control and ensuring data security.

###

Role Permissions

The table below outlines the specific permissions granted to each default user
role, Supervisor and User, within the system.

Permission| Supervisor| User  
---|---|---  
View all Invoices| Yes| No  
Create Invoices| Yes| Yes  
View Transactions| Yes| No  
Process Refunds| Yes| No  
  
###

Adding a New User

To add a new user to the system and assign their respective role and
permissions, follow these step-by-step instructions:

  1. In the side menu, click on **User**.

  2. Click on the **Add User** icon to open the new user form.

  3. Fill in the **Add User Form** with the required details:

     * **First Name:** Enter the user’s first name.

     * **Last Name:** Enter the user’s last name.

     * **Email:** Enter the user’s email address. This must be unique to prevent conflicts.

     * **Phone Number:** Enter the user’s phone number. This must also be unique.

     * **User Outlet:** Select the default outlet or branch the user will be associated with.

     * **User Role:** Choose between **User** or **Supervisor** , depending on the access level required.

     * **Status:** Set to either **Active** or **Suspended** to control immediate access.

     *   4. Once all fields are accurately completed, click **Add** to create the new user account.

> 🚧
>
> Notes:
>
>   * Email and Phone Number must be unique for each user.
>   * Make sure to assign the correct Role before saving.
>

Updated 3 months ago

Edfapay Production Dashboard

Extra Amount Feature

Ask AI



--- URL: https://docs.edfapay.com/docs/webhook ---

###

Introduction to EdfaPay Webhooks

EdfaPay's **Webhook API** offers a robust and reliable method for your system
to receive **real-time notifications** concerning transaction status updates.
This enables automated processes such as confirming orders, marking payments
as complete, or handling failed transactions directly within your application,
eliminating the need for constant polling.

EdfaPay sends a **POST** request to your configured `notification_url` after
every significant payment event.

> ❗️
>
> ###
>
> **Security Note: SSL Required**
>
> Your server _must_ be configured to support **HTTPS** with a valid SSL
> certificate. Connections over HTTP will be rejected.

###

How Webhooks Work

EdfaPay webhooks follow a straightforward process to ensure timely and
accurate delivery of transaction updates:

  * **1\. Provide Your URL:** During the initial transaction request, you specify a `notification_url`.
  * **2\. EdfaPay Sends Notification:** After processing a transaction, EdfaPay sends a POST request to this URL, including a JSON body with event data.
  * **3\. Acknowledge Receipt:** Your system must respond with an `HTTP 200 OK` status to acknowledge successful receipt of the notification.
  * **4\. Retry Mechanism:** If `200 OK` is not received, EdfaPay will retry sending the notification up to 3 times, with a 30-second delay between attempts.

###

Setting Up Your Webhook Endpoint

To successfully receive and process EdfaPay webhook events, you need to
prepare your server endpoint and configure your EdfaPay account:

> 🚧
>
> ###
>
> **Pre-requisite: Portal Configuration**
>
> Before you begin developing your endpoint, ensure you have set up your
> webhook information within your EdfaPay portal account. Refer to the
> **Webhook Information** section in the portal for details.

Your endpoint will be a publicly accessible URL, typically structured as:
`https://your-domain.com/your-webhook-endpoint`

EdfaPay will make a RESTful POST call to this endpoint, delivering a JSON
payload containing the event data specific to the webhook type you are using.

> 📘
>
> ###
>
> **Important Update Note**
>
> It is crucial to keep your callback (`notification_url`) and its underlying
> logic updated. Any changes to your endpoint URL or processing logic must be
> reflected in your EdfaPay portal configuration to ensure continuous and
> correct reception of transaction responses. Failure to update may result in
> missed payment status notifications.

Updated 3 months ago

Apple Pay—Troubleshooting & Error Codes

Webhook Information & Configuration

Ask AI



--- URL: https://docs.edfapay.com/docs/webhook-payloads ---

EdfaPay delivers real-time transaction updates to your configured webhook
endpoint using POST requests. This documentation outlines the various payload
structures you may receive, categorized by transaction status.

###

Redirect Response (3D Secure / Additional Authentication Required)

JSON

    
    
    {
      "action": "SALE",
      "amount": "0.11",
      "card": "512345XXXXXX0008",
      "card_brand": "MASTER",
      "card_expiration_date": "01/2039",
      "currency": "SAR",
      "hash": "examplehash",
      "merchant_name": "Test Merchant",
      "order_id": "ORDER123",
      "redirect_method": "POST",
      "redirect_params": "RedirectParamsObject",
      "redirect_url": "https://3ds.example.com",
      "result": "REDIRECT",
      "status": "REDIRECT",
      "trans_date": "2025-07-20 13:30:19",
      "trans_id": "TX-0001"
    }

###

3D Secure Authentication in Progress (Pending)

JSON

    
    
    {
      "action": "SALE",
      "amount": "0.11",
      "card": "512345XXXXXX0008",
      "card_brand": "MASTER",
      "card_expiration_date": "01/2039",
      "currency": "SAR",
      "hash": "examplehash",
      "merchant_name": "Test Merchant",
      "order_id": "ORDER123",
      "result": "PENDING",
      "sessionId": "SESSION00001",
      "status": "PENDING",
      "trans_date": "2025-07-20 13:30:21",
      "trans_id": "TX-0001"
    }

###

Success Response (Payment Settled)

This payload is sent when a payment transaction has been successfully
processed.

**Common Fields**

**Field**| **Explanation**  
---|---  
action| Always `SALE` for payment transactions.  
amount| The payment amount requested by the merchant.  
card| Masked card number used in the payment (e.g., `XXXXXX0008`).  
card_brand| Type of card: `VISA`, `MASTER`, `MADA`, etc.  
card_expiration_date| Expiry date of the card.  
currency| Transaction currency (e.g., `SAR`).  
hash| Hash signature for verifying webhook authenticity.  
merchant_name| Your business or merchant name.  
order_id| The ID of the order as defined in your system.  
trans_id| Unique transaction ID assigned by EdfaPay.  
trans_date| Date and time of the transaction.  
result| Outcome of the transaction: `SUCCESS`, `REDIRECT`, `PENDING`, or
`DECLINED`.  
status| Current status of the transaction: `SETTLED`, `REDIRECT`, or
`DECLINED`.  
redirect_url| Used for 3D Secure redirection (if required); present only when
`result` is `REDIRECT`.  
redirect_params| Parameters for 3D Secure redirection (if required); present
only when `result` is `REDIRECT`.  
rrn| Reference Retrieval Number (RRN) from the card issuer; present for
successful transactions.  
methods| Integration type used in making the payment (Card, Apple pay)  
recurring_token| Provided when tokenization is used.  
transaction_identifier| Apple Pay–specific identifier  
sessionId| Unique identifier of the initiated payment session created during
the Init Payment request.  
  
JSON

    
    
    {
      "action": "SALE",
      "amount": "0.11",
      "card": "512345XXXXXX0008",
      "card_brand": "MASTER",
      "card_expiration_date": "01/2039",
      "currency": "SAR",
      "hash": "examplehash",
      "merchant_name": "Test Merchant",
      "methods": "applepay",
      "order_id": "ORDER123",
      "recurring_token": "9d8238bc-2877-4f29-a464-token-example",
      "result": "SUCCESS",
      "rrn": "520110182659",
      "status": "SETTLED",
      "trans_date": "2025-07-20 13:31:05",
      "trans_id": "TX-0001",
      "sessionId":"SESSION00000000000000000001",
      "transaction_identifier":"123e4567e89b12d3a456426614174000"
    }

> 🚧
>
> ###
>
> **Confirming Payment Status**
>
> The `PENDING`, `REDIRECT`, and 3D Secure statuses are intermediate. Only
> mark orders as paid upon receiving a payload with both `result: SUCCESS` and
> `status: SETTLED`.
>
> JSON
>  
>  
>     {
>       "result": "SUCCESS",
>       "status": "SETTLED"
>     }

###

Failed Response (Declined)

JSON

    
    
    {
      "action": "SALE",
      "amount": "0.11",
      "card": "512345XXXXXX0008",
      "card_brand": "MASTER",
      "card_expiration_date": "01/2039",
      "currency": "SAR",
      "hash": "examplehash",
      "merchant_name": "Test Merchant",
      "methods": "applepay",
      "order_id": "ORDER123",
      "result": "DECLINED",
      "status": "DECLINED",
      "decline_reason": "Insufficient Funds",
      "trans_date": "2025-07-20 13:31:05",
      "trans_id": "TX-0001"
    }

###

Refund (CREDITVOID Action) Response (Completed)

Notifies you when a refund is successfully processed.

**Field**| **Explanation**  
---|---  
`action`| Indicates a refund action; always `CREDITVOID`.  
`amount`| The amount refunded.  
`card_brand`| Brand of the card used in the original transaction.  
`creditvoid_date`| Date and time the refund was processed.  
`hash`| Hash signature for webhook data validation.  
`merchant_name`| Your registered merchant or store name.  
`order_id`| Your internal order ID associated with the refunded transaction.  
`result`| Outcome of the refund: `ACCEPTED` or `SUCCESS`.  
`rrn`| Reference Retrieval Number (RRN).  
`status`| Status of the refund; always `REFUND`.  
`trans_id`| Original transaction ID from the EdfaPay platform.  
  
JSON

    
    
    {
      "action": "CREDITVOID",
      "amount": "0.11",
      "card_brand": "MASTER",
      "creditvoid_date": "21-07-2025 13:58:14",
      "hash": "e9dfc813ffeca5d3a8XXXXX080278428d33753b",
      "merchant_name": "Test Merchant",
      "order_id": "ORD0SU1",
      "result": "ACCEPTED",
      "rrn": "520xxxx76671",
      "status": "REFUND",
      "trans_id": "5733832xxxxxx5133019"
    }

###

Recurring Payment Response (Settled)

Sent when a recurring payment is successfully processed.

**Field**| **Explanation**  
---|---  
`action`| Indicates a recurring payment; always `RECURRING`.  
`amount`| The amount charged.  
`currency`| Currency of the transaction (e.g., `SAR`, `USD`).  
`order_id`| Your order ID linked to this recurring transaction.  
`trans_id`| Unique transaction ID from EdfaPay.  
`recurring_token`| The token used for this recurring transaction.  
`status`| Status of the recurring payment: `SETTLED` for completion,
`DECLINED` for failure.  
`result`| Outcome of the recurring payment: `SUCCESS` or `DECLINED`.  
`trans_date`| Date and time of this specific recurring payment.  
  
JSON

    
    
    {
      "action": "RECURRING",
      "amount": "0.11",
      "currency": "SAR",
      "order_id": "ORDER123",
      "trans_id": "TX-0001",
      "result": "SUCCESS",
      "status": "SETTLED",
      "recurring_token": "9d8238bc-2877-4f29-a464-token-example",
      "trans_date": "2025-07-20 13:31:05"
    }

###

Webhook Payload Summary

**Action**| **Used For**| **Result Status**| **Lifecycle**  
---|---|---|---  
`SALE`| Payment| `SUCCESS` / `REDIRECT` / `PENDING` / `DECLINED`| Purchase
completed or pending  
`CREDITVOID`| Refund| `ACCEPTED` / `SUCCESS`| Refund completed  
`RECURRING`| Subscription| `SUCCESS` / `DECLINED`| Subscription / recurring  
  
###

Important Notes for Developers

  * Always validate the `hash` parameter to ensure authenticity.
  * Respond to webhooks with HTTP 200 OK to acknowledge receipt.
  * Handle retries safely, as duplicate callbacks may occur.
  * Only mark orders as Paid / Failed upon receiving the final `SUCCESS` / `DECLINED` status.

> 📘
>
> ###
>
> **Hash Validation: Ensuring Webhook Authenticity**
>
> To ensure the integrity and authenticity of webhook payloads, always
> validate the `hash` parameter. This step confirms that the webhook
> originated from EdfaPay and that its content has not been tampered with.
>
> **Implementation:**
>
>   1. **Recalculate the hash:** Generate a new hash using your secret key and
> the received payload data.
>   2. **Compare:** Match your recalculated hash against the `hash` parameter
> provided in the payload.
>   3. **Process:** Only proceed with processing the webhook if the hashes
> match, confirming the payload's validity.
>

>
> For detailed hash formulas and validation rules, see **Webhook Validation**

> ❗️
>
> ###
>
> **Idempotency and Retries: Handling Duplicate Webhooks**
>
> EdfaPay may re-send webhook notifications if your server does not
> acknowledge receipt (e.g., by returning an HTTP 200 OK status). To prevent
> duplicate processing of the same transaction, it is crucial to implement
> idempotency in your system.
>
> **Recommendation:** Design your webhook handler to safely process duplicate
> notifications. This ensures data consistency and prevents unintended side
> effects, even if a webhook is delivered multiple times.

> 🚧
>
> Important Note – Webhook Content Type
>
> EdfaPay webhooks are sent with the header **Content-Type:**
> application/x-www-form-urlencoded;charset=UTF-8.
>
> This means all webhook payload parameters are delivered as string values,
> even if they represent numbers or statuses. Your webhook endpoint must parse
> the request as form-encoded data, not raw JSON.

Updated about 1 month ago

Webhook Operation Types

Testing Webhooks

Ask AI



--- URL: https://docs.edfapay.com/docs/webhook-information ---

This documentation outlines the essential steps for integrating and leveraging
the EdfaPay Webhook Service. Webhooks provide real-time notifications for
critical events, ensuring your systems remain synchronized and up-to-date.

###

Webhook Setup Guide

Follow these steps to configure your webhook endpoint in the EdfaPay
Dashboard:

  1. **Log In:** Access your EdfaPay Dashboard.
  2. **Navigate:** Go to **Settings** , then select **Callback URL**.
  3. **Add Endpoint:** Input the URL of your server endpoint designated for receiving webhook notifications.
  4. **Save Configuration:** Click **Save** to confirm your configuration.
  5. **Test & Verify:** Verify that your endpoint is actively listening and correctly processing incoming webhook payloads.

> ❗️
>
> ###
>
> Immediate Update Required for Webhook URLs Upon Environment Changes
>
> **Reasoning:** Transitioning between environments **(UAT ➔ Production)** or
> altering domains will invalidate previously configured webhook URLs.
>
> **Action:** Ensure your webhook URL is promptly updated within the EdfaPay
> Dashboard to maintain continuous service.

Updated 13 days ago

Webhook

Webhook Operation Types

Ask AI



--- URL: https://docs.edfapay.com/docs/webhook-validation ---

To ensure security, **every webhook notification must be validated using a
hash**.

Webhook validation and is the **only trusted way** to confirm that a payment
notification:

  * Was sent by **EdfaPay**
  * Was **not altered** during transmission

##

Webhook Validation Concept

Webhook validation is based on a **shared-secret hash mechanism**.

  * EdfaPay generates a hash using transaction data and the merchant’s secret PASSWORD
  * The same hash is recalculated by the merchant upon receiving the webhook
  * If both hashes match, the webhook is considered **authentic**.

##

General Validation Method

Regardless of the integration type, the webhook validation process is always
the same:

  1. Receive the webhook request from EdfaPay
  2. Read the webhook payload parameters
  3. Recalculate the webhook hash using the correct formula
  4. Compare your calculated hash with the hash sent by EdfaPay
  5. Validation result: 
     * ✅ Hashes match → Webhook is valid
     * ❌ Hashes do not match → Webhook must be rejected or ignored

##

Webhook Hash Calculation

The webhook hash formula depends on the integration flow used.

###

Checkout Webhook Hash

Used for **Checkout** integrations.

    
    
    MD5(strtoupper(strrev(email) + PASSWORD + trans_id + strrev(substr(card_number,0,6) + substr(card_number,-4))))

**Parameters:**

  * `email` → Customer email
  * `PASSWORD` → Merchant password
  * `trans_id` → Transaction ID generated by EdfaPay
  * `card_number` → Card number (first 6 and last 4 digits only)

> The **hash** sent in the initiate request **should not match** the hash
> received in the webhook notification.

###

Server-to-Server (S2S) Webhook Hash

Used for **Server-to-Server (S2S) Embedded** integrations. This hash follows
the **same logic used in the SALE request**.

    
    
    MD5(strtoupper(strrev(email).PASSWORD.strrev(substr(card_number,0,6).substr(card_number,-4))))

**Parameters:**

  * `email` → Customer email
  * `PASSWORD` → Merchant password
  * `card_number` → Card number (first 6 and last 4 digits only)

> `trans_id` is **not included** in S2S webhook hash calculation.

##

Validation Rules

  * Use the **correct hash formula** based on the integration type
  * Don't compare webhook hash with initiate hash

##

Security Notes

  * Treat merchant key and merchant PASSWORD as strictly confidential
  * Always use HTTPS for the webhook endpoint
  * Reject invalid webhook requests silently
  * Make sure the webhook endpoint are never shared with anyone

Updated about 1 month ago

Testing Webhooks

Authentication

Ask AI



--- URL: https://docs.edfapay.com/docs/webhook-operation-types ---

###

Webhook Operation Types

EdfaPay provides webhook callbacks for the following operation types,
correlating with various payment workflows:

**Operation Type**| **Description**  
---|---  
**SALE**|  Indicates a payment (sale) transaction is being processed.  
**3DS**|  Signifies that a 3D Secure authentication process is initiated or
ongoing.  
**REDIRECT**|  Occurs when the customer is redirected for an additional action
(e.g., 3D Secure authentication).  
**REFUND**|  Denotes that a refund request has been processed.  
**RECURRING**|  Represents a recurring payment initiated using stored
credentials or a token.  
  
###

API Request Actions

When submitting API requests to EdfaPay, specify the `action` parameter
corresponding to the desired transaction type:

**Action**| **Description**  
---|---  
**Initiate**|  Creates a **SALE** (payment) or **AUTH** (authorization)
transaction.  
**Refund**|  Initiates a **refund** for an existing transaction.  
**STATUS**|  Retrieves the current **status** of a transaction.  
**Recurring**|  Creates a **SALE** or **AUTH** using previously stored
customer card data.  
  
###

Transaction Result and Status Values

This section details the possible `Result` and `Status` values returned for
transactions.

####

Result — Immediate Outcome of the Action

The `Result` indicates the immediate outcome of the performed action.

**Result**| **Description**  
---|---  
**SUCCESS**|  The action was successfully completed.  
**DECLINED**|  The action failed or the transaction was rejected.  
**REDIRECT**|  An additional action is required, typically a 3D Secure
redirection.  
**ACCEPTED**|  The request was accepted, but processing will complete at a
later time.  
**ERROR**|  The request contained errors or was invalid.  
  
####

Status — Current Lifecycle State of the Transaction

The `Status` reflects the current lifecycle state of the transaction.

**Status**| **Description**  
---|---  
**3DS**|  Transaction is awaiting 3D Secure authentication (Challenge).  
**REDIRECT**|  Transaction is awaiting customer redirection (e.g., to a 3D
Secure page).  
**SETTLED**|  Payment completed successfully, and funds have been captured.  
**REFUND**|  Payment has been successfully refunded.  
**DECLINED**|  Payment failed or the transaction was rejected.  
  
Important Notes

EdfaPay webhook notifications are asynchronous; always verify transaction
status via direct API calls. Properly manage REDIRECT and 3DS flows requiring
customer interaction. Distinguish between 'Result' (immediate API outcome) and
'Status' (transaction lifecycle state); a successful 'Result' doesn't
guarantee finalization. Implement idempotency checks for webhook processing.

Security Considerations

Always verify webhook digital signatures. Configure webhook endpoints securely
with HTTPS and enforce strict access controls. Adhere to PCI DSS for sensitive
cardholder data. Implement robust error handling and logging, avoiding
exposure of sensitive information. Handle and store customer card data
securely, compliant with best practices and regulations.

Updated 3 months ago

Webhook Information & Configuration

Webhook Payloads

Ask AI



