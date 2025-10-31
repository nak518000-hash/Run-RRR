document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const tableBody = document.getElementById('table-body');
    const ratePerKgInput = document.getElementById('rate-per-kg');
    const finalPriceDisplay = document.getElementById('final-price'); 
    
    // TARGET ELEMENTS FOR DYNAMIC LAYOUT/HEIGHT
    const resultsSection = document.querySelector('.results-section'); 
    
    const totalMilkKgDisplay = document.getElementById('total-milk-kg');
    const totalBadhotriGmDisplay = document.getElementById('total-badhotri-gm');
    
    const combinedTotalValueDisplay = document.getElementById('combined-total-value'); 
    const quantityForRateDisplay = document.getElementById('quantity-for-rate');
    const rateSectionTitle = document.getElementById('rate-section-title'); 
    // const appBody = document.getElementById('app-body'); // Dark Mode removed
    const combinedLabelDisplay = document.querySelector('.total-combined .combined-label');
    
    // Settings elements
    const settingsModal = document.getElementById('settings-modal');
    const openSettingsBtn = document.getElementById('open-settings-btn');
    const settingsCloseBtn = document.getElementById('settings-close-btn'); 
    // const darkModeToggle = document.getElementById('dark-mode-toggle'); // Removed
    const languageSelect = document.getElementById('language-select');
    const helpCenterBtn = document.getElementById('help-center-btn'); 
    
    // Clear Button Element
    const clearAllBtn = document.getElementById('clear-all-btn'); 

    // Clear All Modal Elements
    const clearAllModal = document.getElementById('clear-all-modal'); 
    const clearCloseBtn = document.getElementById('clear-close-btn');   
    const clearCancelBtn = document.getElementById('clear-cancel-btn'); 
    const clearConfirmBtn = document = document.getElementById('clear-confirm-btn'); 

    // Line Delete Elements
    const deleteStartInput = document.getElementById('delete-start-serial'); 
    const deleteEndInput = document.getElementById('delete-end-serial');   
    const deleteLinesBtn = document.getElementById('delete-lines-btn-main'); 

    // Share App Modal Elements - **REMOVED**
    // const shareAppModal = document.getElementById('share-app-modal');
    // const openShareModalBtn = document.getElementById('open-share-modal-btn'); 
    // const shareAppCloseBtn = document.getElementById('share-app-close-btn');
    // const appLinkDisplay = document.getElementById('app-link-display');
    // const copyLinkBtn = document.getElementById('copy-link-btn');
    // const copyTooltip = document.getElementById('copy-tooltip');

    // Help Center Elements
    const helpCenterModal = document.getElementById('help-center-modal');
    const helpCenterCloseBtn = document.getElementById('help-center-close-btn');
    const helpForm = document.getElementById('help-form');
    const problemDescription = document.getElementById('problemDescription');
    const charCountDisplay = document.getElementById('char-count-display'); 
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userPhoneInput = document.getElementById('userPhone');

    // Custom Alert Modal Elements 
    const errorAlertModal = document.getElementById('error-alert-modal');
    const alertMessageText = document.getElementById('alert-message-text');
    const alertCloseBtn = document.getElementById('alert-close-btn');
    const alertOkBtn = document.getElementById('alert-ok-btn');
    
    // Total Users Display (Static) - **REMOVED**
    // const userCountDisplay = document.querySelector('.user-count-display');
    // const totalUsers = '0000000001'; 
    // if (userCountDisplay) userCountDisplay.textContent = totalUsers;

    // --- Core App Link and Text ---
    const APP_URL = 'https://your-domain.com/app-apk.apk'; 
    
    // appLinkDisplay.value = APP_URL; // Removed
    
    // Scrolling animation duration for individual badhotri boxes
    const SCROLL_ANIMATION_DURATION = '13.431s'; 
    
    // --- LAYOUT CONSTANTS ---
    const NBSP = '&nbsp;';
    
    // --- Localization/Language Dictionary ---
    const translations = {
        hi: {
            app_title: 'Milk Scale App', 
            serial: 'क्रम',
            milk_kg: 'दूध (Kg)',
            sample: 'सैंपल',
            badhotri_gm: 'बढ़ोतरी (Gm)',
            total_milk_label: 'कुल दूध',
            total_badhotri_label: 'कुल बढ़ोतरी',
            combined_total_label: 'दूध + बढ़ोतरी = ',
            total_amount_label: 'कुल धनराशि', 
            settings_title: 'सेटिंग्स',
            // total_users_label: 'कुल यूज़र', // Removed
            // dark_mode_label: 'डार्क मोड', // Removed
            change_language_label: 'भाषा बदलें',
            help_center_btn: 'सहायता केंद्र', 
            // share_app_btn: 'ऐप शेयर करें', // Removed
            placeholder_milk: 'दूध', 
            placeholder_sample: 'सैंपल', 
            placeholder_rate: 'दर', 
            alert_message: 'कृपया अगली लाइन जोड़ने से पहले पिछली लाइन में दूध या सैंपल का मान भरें।',
            copy_success_tooltip: 'कॉपी किया गया!', 
            copy_link_btn: '📋', 
            copy_link_text: '', 
            clear_btn: 'Clear', 
            
            // CLEAR MODAL KEYS 
            clear_modal_title: 'डेटा साफ़ करें',
            clear_modal_warning: 'क्या आप वाकई सारा डेटा (दूध, सैंपल और दर) हटाना चाहते हैं?',
            clear_modal_cancel: 'रद्द करें',
            clear_modal_confirm: 'हाँ, हटाएँ',
            
            // LINE DELETE KEYS
            delete_lines_label: 'पंक्ति हटाएँ',
            placeholder_start: 'शुरू',
            placeholder_end: 'अंत',
            separator_to: 'से',
            delete_btn: 'हटाएँ', 

            // Share App Translations - **REMOVED**
            // share_app_title: 'ऐप शेयर करें',
            // share_app_sub_title: 'इस लिंक को दोस्तों के साथ साझा करें:',
            // share_app_via_social: 'सीधे भेजें:',
            // share_whatsapp_text: 'WhatsApp', 
            // share_telegram_text: 'Telegram', 
            // share_message: 'यह Milk Scale App बहुत उपयोगी है! इसे डाउनलोड करने के लिए यहाँ देखें: ',
            
            // Help Center Translations
            help_center_title: 'सहायता केंद्र',
            form_name_label: 'आपका नाम',
            placeholder_name: 'अपना नाम', 
            form_email_label: 'ईमेल आईडी',
            placeholder_email: 'वैध ईमेल',
            form_phone_label: 'फ़ोन नंबर',
            placeholder_phone: 'वैध फ़ोन नंबर',
            form_problem_label: 'अपनी समस्या का वर्णन करें', 
            placeholder_problem: 'अपनी समस्या का वर्णन करें', 
            form_send_btn: 'भेजें', 
            form_error_no_problem: 'कृपया अपनी समस्या का विवरण भरें।',
            email_subject: 'Milk Scale App - सहायता अनुरोध',
            lang_hi: 'हिन्दी', 
            lang_en: 'English',
            alert_ok_btn_text: 'ठीक है'
        },
        en: {
            app_title: 'Milk Scale App', 
            serial: 'Sr. No.',
            milk_kg: 'Milk (Kg)',
            sample: 'Sample',
            badhotri_gm: 'Increment (Gm)',
            total_milk_label: 'Total Milk',
            total_badhotri_label: 'Total Increment',
            combined_total_label: 'Milk + Increment = ',
            total_amount_label: 'Total amount', 
            settings_title: 'Settings',
            // total_users_label: 'Total Users', // Removed
            // dark_mode_label: 'Dark Mode', // Removed
            change_language_label: 'Change Language',
            help_center_btn: 'Help Center', 
            // share_app_btn: 'Share App', // Removed
            placeholder_milk: 'Milk', 
            placeholder_sample: 'Sample', 
            placeholder_rate: 'Rate', 
            alert_message: 'Please enter Milk or Sample value in the previous line before adding the next one.',
            copy_success_tooltip: 'Copied!', 
            copy_link_btn: '📋', 
            copy_link_text: '', 
            clear_btn: 'Clear', 
            
            // CLEAR MODAL KEYS 
            clear_modal_title: 'Clear Data',
            clear_modal_warning: 'Are you sure you want to clear all data (Milk, Sample, and Rate)?',
            clear_modal_cancel: 'Cancel',
            clear_modal_confirm: 'Yes, Clear',
            
            // LINE DELETE KEYS
            delete_lines_label: 'Delete Lines',
            placeholder_start: 'Start',
            placeholder_end: 'End',
            separator_to: 'to',
            delete_btn: 'Delete', 
            
            // Share App Translations - **REMOVED**
            // share_app_title: 'Share App',
            // share_app_sub_title: 'Share this link with friends:',
            // share_app_via_social: 'Share directly via:',
            // share_whatsapp_text: 'WhatsApp', 
            // share_telegram_text: 'Telegram', 
            // share_message: 'This Milk Scale App is very useful! Download it here: ',
            
            // Help Center Translations
            help_center_title: 'Help Center',
            form_name_label: 'Your Name',
            placeholder_name: 'Enter your name', 
            form_email_label: 'Email ID',
            placeholder_email: 'Valid Email',
            form_phone_label: 'Phone Number',
            placeholder_phone: 'Valid Phone Number',
            form_problem_label: 'Describe your problem', 
            placeholder_problem: 'Describe your problem', 
            form_send_btn: 'Send', 
            form_error_no_problem: 'Please fill in the problem description.',
            email_subject: 'Milk Scale App - Help Request',
            lang_hi: 'Hindi', 
            lang_en: 'English',
            alert_ok_btn_text: 'OK'
        }
    };
    
    // Custom Alert Function 
    function showAlert(message) {
         alertMessageText.textContent = message;
         errorAlertModal.style.display = 'block';
    }
    
    // --- CORE TRANSLATION FUNCTION ---
    function applyLanguage(lang) {
        const t = translations[lang];
        if (!t) return;
        
        // 1. Title, Header Title, and Rate Title
        document.title = t.app_title;
        document.querySelector('.app-header h1').textContent = t.app_title;
        if (rateSectionTitle) {
             rateSectionTitle.textContent = t.total_amount_label;
        }

        // 2. Translate all elements with data-key
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            const translation = t[key];
            
            if (!translation) return;

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else if (element.id === 'copy-link-btn') {
                 // Check if the tooltip element exists within the button
                 let currentTooltip = element.querySelector('.copy-tooltip');
                 if (!currentTooltip) {
                     currentTooltip = document.createElement('span');
                     currentTooltip.className = 'copy-tooltip';
                     currentTooltip.id = 'copy-tooltip';
                     currentTooltip.dataset.key = 'copy_success_tooltip';
                     element.appendChild(currentTooltip);
                 }
                 currentTooltip.textContent = t.copy_success_tooltip;
                 // **NOTE:** Since share app modal is removed, this part is mostly dormant
                 // but kept just in case you reintroduce the button later.
                 element.innerHTML = `📋${currentTooltip.outerHTML}`; 
            } else if (element.id === 'copy-tooltip') {
                 element.textContent = translation;
            } else if (element.id === 'delete-lines-btn-main' || element.id === 'clear-all-btn' || element.id === 'clear-cancel-btn' || element.id === 'clear-confirm-btn' || element.id === 'alert-ok-btn') {
                 // No change needed for the element.textContent logic for the remaining buttons
                 element.textContent = translation; 
            } else {
                element.textContent = translation;
            }
        });
        
        // 3. Custom updates for specific elements 
        if (combinedLabelDisplay) {
            combinedLabelDisplay.textContent = t.combined_total_label; 
        }
        
        // 4. Update the Range Separator (the 'से' or 'to' text)
        const rangeSeparator = document.querySelector('.range-separator');
        if (rangeSeparator) {
            rangeSeparator.textContent = t.separator_to;
        }

        initializeTable(false); 
        updateCalculations(); 
    }
    
    // --- UTILITY FUNCTIONS (UPDATED FOR BigInt ACCURACY) ---
    
    // Parses number inputs (like Rate and Delete Serials) which are small enough
    function parseInputToNumber(value) {
        let cleaned = value.toString().replace(/[eE,]/g, '').replace(/[^0-9.]/g, '');
        if (cleaned.endsWith('.')) {
            cleaned = cleaned.slice(0, -1);
        }
        return parseFloat(cleaned) || 0;
    }
    
    // 🔑 NEW FUNCTION: Parses MILK/SAMPLE inputs to BigInt (for precise calculation)
    function parseInputToBigInt(value) {
        // Remove commas, scientific notation, and decimal points (assuming Milk/Sample are whole or the decimal is handled later)
        // Since milk input is "inputmode=decimal", we need to handle the decimal. 
        // We convert to BigInt(100) * Kg, so 12.34 Kg becomes 1234 BigInt units.
        let cleaned = value.toString().replace(/[eE,]/g, '').replace(/[^0-9.]/g, '');
        
        if (cleaned === '') return 0n; // 0n is BigInt zero

        // Milk can be decimal (e.g., 12.34 Kg), but BigInt only handles integers.
        // Multiply by 100 to shift the decimal by 2 places (to handle up to 2 decimal places in Kg).
        const parts = cleaned.split('.');
        let integerPart = parts[0] || '0';
        let decimalPart = (parts[1] || '00').padEnd(2, '0').substring(0, 2); // Only take 2 decimal places
        
        // Combine as a single string of up to 2 decimal precision
        const bigIntString = integerPart + decimalPart;
        
        try {
             return BigInt(bigIntString);
        } catch (e) {
             console.error("BigInt conversion failed:", e);
             return 0n;
        }
    }

    // NEW FUNCTION: Formats BigInt into a decimal string (BigInt / 100)
    function formatBigIntToNumberString(bigIntValue, divisor = 1n) {
        if (bigIntValue === 0n) return '0';
        
        const finalBigInt = bigIntValue * 100n / divisor; // BigInt with 2 implied decimal places
        const isNegative = finalBigInt < 0n;
        const absoluteBigInt = isNegative ? -finalBigInt : finalBigInt;
        
        const stringValue = absoluteBigInt.toString();
        
        // Find the index to place the decimal point (2 places from the end)
        const decimalIndex = stringValue.length - 2;

        let result;
        if (decimalIndex <= 0) {
            // Case: < 0.01, e.g., '5' becomes '0.05'
            result = '0.' + '0'.repeat(2 - stringValue.length) + stringValue;
        } else {
            // Case: normal number
            result = stringValue.slice(0, decimalIndex) + '.' + stringValue.slice(decimalIndex);
        }
        
        // Remove trailing zeros (e.g., 5.00 -> 5)
        result = result.replace(/(\.0+|0+)$/, '');
        
        return isNegative ? `-${result}` : result;
    }
    
    // Existing function for small number formatting (e.g., Rate Price)
    function formatNumberString(value) {
        if (value === 0) return '0';
        // Use a high precision for safety when formatting large intermediate floating point numbers
        let stringValue = value.toFixed(10); 
        
        if (stringValue.includes('e') || stringValue.includes('E')) {
             // Fallback to toLocaleString for very large/small numbers if needed, though BigInt should prevent this for core calc
             stringValue = Number(value).toLocaleString('fullwide', {useGrouping: false}) || stringValue;
        }

        return stringValue.replace(/(\.0+|0+)$/, '');
    }
    
    // Toggle Scroll and Highlight Function (Black Border is Persistent)
    function toggleScrollAndHighlight(event) {
        const badhotriBox = event.currentTarget;
        const scrollingText = badhotriBox.querySelector('.scrolling-text');
        
        if (badhotriBox.classList.contains('static-box')) {
             badhotriBox.classList.add('highlight-border');
             setTimeout(() => {
                 badhotriBox.classList.remove('highlight-border');
             }, 100);
             return;
        }

        const isBorderActive = badhotriBox.classList.contains('highlight-border');
        
        if (isBorderActive) {
            badhotriBox.classList.remove('highlight-border');
            scrollingText.style.animationPlayState = 'running';
            badhotriBox.setAttribute('title', 'Scrolling: Running');
        } else {
            badhotriBox.classList.add('highlight-border');
            scrollingText.style.animationPlayState = 'paused';
            badhotriBox.setAttribute('title', 'Scrolling: Paused (Click to restart)');
        }
    }

    // --- CORE LOGIC (UPDATED FOR BigInt) ---
    // Calculates Badhotri in BigInt units (Gm * 100)
    function calculateBadhotri(sampleBigInt, milkKgBigInt) {
        // sampleBigInt is Sample * 100 (from parseInputToBigInt)
        // milkKgBigInt is MilkKg * 100 (from parseInputToBigInt)
        
        // Formula: (Sample - 65) * 15 * MilkKg
        
        // Step 1: Sample - 65
        // Sample is already integer (Sample * 100). 65 must also be * 100 for subtraction.
        const sampleValue = sampleBigInt / 100n; // Get the integer sample value
        const sampleFactor = sampleValue - 65n; 
        
        // Step 2: sampleFactor * 15
        const factor15 = sampleFactor * 15n;
        
        // Step 3: factor15 * MilkKg
        // MilkKg is milkKgBigInt / 100
        const milkKgValue = milkKgBigInt / 100n;
        
        const badhotriGmBigInt = factor15 * milkKgValue; 
        
        // The result is an exact integer in Gm.
        return badhotriGmBigInt; 
    }
    
    // 🔑 NEW FUNCTION: RE-INDEXES SERIAL NUMBERS
    function updateSerialNumbers() {
        const rows = tableBody.querySelectorAll('.input-row');
        rows.forEach((row, index) => {
             const newSerial = index + 1;
             // Update the data attribute
             row.dataset.serial = newSerial;
             // Update the visible serial number in the first cell
             const serialCell = row.querySelector('.cell:first-child');
             if (serialCell) {
                 serialCell.textContent = newSerial;
             }
        });
    }
    
    // Function: Clear All Inputs
    function clearAllInputs() {
        // Target Milk, Sample, and Rate inputs
        const allInputs = document.querySelectorAll('.milk-kg-input, .sample-input, #rate-per-kg');
        
        // Reset all values to empty string
        allInputs.forEach(input => {
            input.value = '';
        });
        
        // Reset Delete inputs
        deleteStartInput.value = '';
        deleteEndInput.value = '';
        
        // Update calculations (everything will become 0)
        updateCalculations();
        
        // Remove highlight from all badhotri boxes
        document.querySelectorAll('.badhotri-box').forEach(box => {
            box.classList.remove('highlight-border');
            const scrollingText = box.querySelector('.scrolling-text');
            if (scrollingText) {
                 scrollingText.style.animationPlayState = 'running';
            }
            box.removeAttribute('title');
        });
        
        // Ensure at least one row exists after clearing all data
        initializeTable(true);
    }

    function updateCalculations() {
        let totalMilkKgBigInt = 0n; // Total Milk in Kg * 100 units (for accurate addition)
        let totalBadhotriGmBigInt = 0n; // Total Badhotri in Gm units (BigInt)
        
        const inputRows = tableBody.querySelectorAll('.input-row');
        inputRows.forEach(row => {
            const milkKgInput = row.querySelector('.milk-kg-input');
            const sampleInput = row.querySelector('.sample-input');
            const badhotriBox = row.querySelector('.badhotri-box'); 
            const scrollingText = badhotriBox.querySelector('.scrolling-text');
            
            const milkKgRawValue = milkKgInput.value.trim();
            const sampleRawValue = sampleInput.value.trim();
            
            // Parse inputs as BigInt with 2 decimal precision (Value * 100)
            const milkKgBigInt = parseInputToBigInt(milkKgRawValue); 
            const sampleBigInt = parseInputToBigInt(sampleRawValue); 
            
            // ONLY ADD MILK KG TO TOTAL MILK if the input is non-empty
            if (milkKgRawValue !== '') {
                 // Add in Kg*100 units
                 totalMilkKgBigInt += milkKgBigInt;
            }
            
            // Only calculate Badhotri if both Milk and Sample inputs are provided
            if (milkKgRawValue === '' || sampleRawValue === '') {
                // If either Milk or Sample is missing, Badhotri is ---
                scrollingText.textContent = '---';
                badhotriBox.classList.add('static-box');
                badhotriBox.classList.remove('positive', 'negative', 'highlight-border'); 
                scrollingText.style.animation = 'none'; 
                return; 
            }

            // Badhotri is calculated in exact Gm units (BigInt)
            const badhotriGmBigInt = calculateBadhotri(sampleBigInt, milkKgBigInt); 
            
            // Format Badhotri (Gm) for display
            const badhotriGmDisplay = badhotriGmBigInt.toString();
            
            // Use non-breaking space for 'Gm' unit in individual box
            scrollingText.innerHTML = `${badhotriGmDisplay}${NBSP}Gm`; 
            
            badhotriBox.classList.remove('positive', 'negative', 'static-box'); 
            
            const rawDisplayValue = badhotriGmDisplay;
            
            if (badhotriGmBigInt === 0n) {
                 // If badhotriGm is 0, display '---'
                 scrollingText.textContent = '---';
                 badhotriBox.classList.add('static-box'); 
                 scrollingText.style.animation = 'none'; 
                 badhotriBox.classList.remove('highlight-border'); 
            } else {
                 if (badhotriGmBigInt > 0n) {
                    badhotriBox.classList.add('positive');
                } else if (badhotriGmBigInt < 0n) { 
                    badhotriBox.classList.add('negative'); 
                }
                
                // If the numeric part length is > 7, enable scrolling.
                // NOTE: BigInt.toString().length is used
                if (rawDisplayValue.length > 7) { 
                    badhotriBox.classList.remove('static-box'); 
                    scrollingText.style.animation = `marquee-badhotri ${SCROLL_ANIMATION_DURATION} linear infinite`;
                    
                    if (badhotriBox.classList.contains('highlight-border')) {
                         scrollingText.style.animationPlayState = 'paused'; 
                         badhotriBox.setAttribute('title', 'Scrolling: Paused (Click to restart)');
                    } else {
                         scrollingText.style.animationPlayState = 'running'; 
                         badhotriBox.removeAttribute('title');
                    }
                    
                } else {
                    badhotriBox.classList.add('static-box');
                    scrollingText.style.animation = 'none'; 
                    scrollingText.style.animationPlayState = ''; 
                    badhotriBox.classList.remove('highlight-border'); 
                    badhotriBox.removeAttribute('title');
                }
                
                // Only add badhotri if both inputs are valid and badhotri is non-zero
                totalBadhotriGmBigInt += badhotriGmBigInt;
            }
        });
        
        // --- TOTAL CALCULATIONS & LAYOUT LOGIC ---
        
        // 1. Calculate and Format Totals (using BigInts for milk and badhotri)
        const ratePerKg = parseInputToNumber(ratePerKgInput.value);
        
        // Format Total Milk (Kg) from Kg*100 BigInt
        const totalMilkKgDisplayValue = formatBigIntToNumberString(totalMilkKgBigInt, 100n); 
        
        // Format Total Badhotri (Gm) from Gm BigInt
        const totalBadhotriGmDisplayValue = totalBadhotriGmBigInt.toString();

        // 2. Check Length Requirement (7 ANK SE ZYADA HO TO BADA)
        const milkLength = totalMilkKgDisplayValue.replace('-', '').replace('.', '').length;
        const badhotriLength = totalBadhotriGmDisplayValue.replace('-', '').replace('.', '').length;
        
        const MAX_DIGITS_SMALL_BOX = 7; 
        
        // Layout Decision: If EITHER total has more than 7 digits, go full width stack.
        const shouldStack = milkLength > MAX_DIGITS_SMALL_BOX || badhotriLength > MAX_DIGITS_SMALL_BOX;

        // 3. Apply/Remove Full-Width Stack Class
        if (shouldStack) {
            resultsSection.classList.add('full-width-stack');
        } else {
            resultsSection.classList.remove('full-width-stack');
        }
        
        // 4. Update Display with formatted text (Kg/Gm unit)
        const totalMilkText = `${totalMilkKgDisplayValue}${NBSP}Kg`;
        totalMilkKgDisplay.innerHTML = totalMilkText;
        
        const totalBadhotriText = `${totalBadhotriGmDisplayValue}${NBSP}Gm`;
        totalBadhotriGmDisplay.innerHTML = totalBadhotriText;

        // 5. Apply colors
        totalBadhotriGmDisplay.classList.remove('green-text', 'red-text');
        if (totalBadhotriGmBigInt > 0n) {
            totalBadhotriGmDisplay.classList.add('green-text');
        } else if (totalBadhotriGmBigInt < 0n) {
            totalBadhotriGmDisplay.classList.add('red-text'); 
        } else {
             // If 0, keep it green (neutral/positive)
             totalBadhotriGmDisplay.classList.add('green-text'); 
        }
        
        // 6. Final Combined and Price Calculations
        // Combined Total Kg: (totalMilkKgBigInt / 100) + (totalBadhotriGmBigInt / 1000)
        
        // Convert Badhotri Gm to Kg*100 BigInt units for addition: (Gm * 10) / 1000 * 100
        const badhotriInKgBigInt = totalBadhotriGmBigInt / 10n; 
        
        // Combined Total is in Kg*100 BigInt units
        let combinedTotalBigInt = totalMilkKgBigInt + badhotriInKgBigInt;
        
        const combinedTotalValue = formatBigIntToNumberString(combinedTotalBigInt, 100n); 
        combinedTotalValueDisplay.innerHTML = `${combinedTotalValue}${NBSP}Kg`;

        // Price Calculation MUST use floating point for the final multiplication with rate
        // Combined Total Kg * Rate Per Kg
        let combinedTotalKgFloat = parseInputToNumber(combinedTotalValue); // Convert back to float for rate calculation
        
        let finalPrice = combinedTotalKgFloat * ratePerKg; 
        const finalPriceValue = formatNumberString(finalPrice);
        
        quantityForRateDisplay.textContent = `(${combinedTotalValue})`;
        finalPriceDisplay.textContent = `${finalPriceValue}`;
    }

    // Function: deleteLinesByRange 
    function deleteLinesByRange() {
        
        const currentLang = languageSelect.value || 'hi';
        const t = translations[currentLang];
        
        const startSerial = parseInt(deleteStartInput.value);
        const endSerial = parseInt(deleteEndInput.value);
        
        const currentRows = tableBody.querySelectorAll('.input-row');
        const totalRows = currentRows.length;

        // --- 1. Validation ---

        if (totalRows === 1) {
             showAlert(currentLang === 'hi' 
                ? 'क्षमा करें, आप अंतिम पंक्ति को नहीं हटा सकते। कम से कम 1 पंक्ति आवश्यक है।' 
                : 'Sorry, you cannot delete the last line. At least 1 line is required.');
             deleteStartInput.value = '';
             deleteEndInput.value = '';
             return;
        }
        
        if (deleteStartInput.value === '' && deleteEndInput.value === '') {
             showAlert(currentLang === 'hi'
                 ? 'कृपया हटाने के लिए शुरू और अंत में क्रम संख्या दर्ज करें, या केवल एक संख्या दर्ज करें।'
                 : 'Please enter serial numbers in both start and end inputs, or a single number in the start input.');
             return;
        }


        let finalStart = startSerial;
        let finalEnd = endSerial;
        
        // Case 2: Only End is filled (Default to start=end, but validation below catches if start is invalid)
        if (deleteStartInput.value === '' && deleteEndInput.value !== '') {
            if (isNaN(endSerial) || endSerial < 1) {
                 showAlert(currentLang === 'hi' ? 'कृपया हटाने के लिए वैध क्रम संख्या दर्ज करें।' : 'Please enter a valid serial number for deletion.');
                 return;
            }
            finalStart = finalEnd; // Assume user wants to delete only the End line
        }
        // Case 1: Only Start is filled
        else if (deleteStartInput.value !== '' && deleteEndInput.value === '') {
             if (isNaN(startSerial) || startSerial < 1) {
                 showAlert(currentLang === 'hi' ? 'कृपया हटाने के लिए वैध क्रम संख्या दर्ज करें।' : 'Please enter a valid serial number for deletion.');
                 return;
            }
            finalEnd = finalStart; 
        }
        
        // --- Re-validate after auto-filling if only one input was provided ---
        if (isNaN(finalStart) || isNaN(finalEnd) || finalStart < 1 || finalEnd < 1) {
            showAlert(currentLang === 'hi' 
                ? 'कृपया हटाने के लिए शुरू और अंत दोनों में 1 या उससे अधिक की वैध क्रम संख्या दर्ज करें।'
                : 'Please enter valid serial numbers of 1 or more for both start and end.');
            return;
        }

        if (finalStart > totalRows || finalEnd > totalRows) {
            showAlert(currentLang === 'hi' 
                ? `क्षमा करें, आप केवल 1 से ${totalRows} तक की पंक्तियों को ही हटा सकते हैं।`
                : `Sorry, you can only delete lines from 1 to ${totalRows}.`);
            return;
        }

        if (finalStart > finalEnd) {
            showAlert(currentLang === 'hi' 
                ? 'शुरू की क्रम संख्या (Start Serial) अंत की क्रम संख्या (End Serial) से बड़ी नहीं हो सकती।'
                : 'Start Serial cannot be greater than End Serial.');
            return;
        }
        
        const linesToDelete = finalEnd - finalStart + 1;
        const rowsRemaining = totalRows - linesToDelete;

        if (rowsRemaining < 1) {
            showAlert(currentLang === 'hi' 
                ? 'क्षमा करें, इस रेंज को हटाने से कोई पंक्ति नहीं बचेगी। कम से कम 1 पंक्ति आवश्यक है।'
                : 'Sorry, deleting this range will leave no lines. At least 1 line is required.');
            return;
        }

        // --- 2. Perform Deletion ---
        
        // Delete rows based on the serial number range
        const rowsSnapshot = tableBody.querySelectorAll('.input-row');
        rowsSnapshot.forEach(row => {
             const serial = parseInt(row.dataset.serial);
             if (serial >= finalStart && serial <= finalEnd) {
                 tableBody.removeChild(row);
             }
        });

        // --- 3. Final Updates ---
        // 🔑 CORRECTED: Re-index the serial numbers of the remaining rows
        updateSerialNumbers();
        updateCalculations();
        
        // 4. Clear Input after successful deletion
        deleteStartInput.value = '';
        deleteEndInput.value = '';
    }

    function createRow(serial) {
        const row = document.createElement('div');
        row.classList.add('input-row');
        row.dataset.serial = serial;
        
        const currentLang = languageSelect.value || 'hi';
        const t = translations[currentLang];
        
        // HTML structure remains the same
        row.innerHTML = `
            <div class="cell">${serial}</div>
            <div class="cell"><input type="text" inputmode="decimal" class="milk-kg-input" value="" placeholder="${t.placeholder_milk}" data-key="placeholder_milk"></div>
            <div class="cell"><input type="text" inputmode="numeric" class="sample-input" value="" placeholder="${t.placeholder_sample}" min="0" data-key="placeholder_sample"></div>
            <div class="cell">
                <div class="badhotri-box static-box" tabindex="-1">
                    <span class="scrolling-text">---</span>
                </div>
            </div>
            <div class="cell action-cell"></div>
        `;

        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateCalculations);
        });
        
        const milkInput = row.querySelector('.milk-kg-input');
        const sampleInput = row.querySelector('.sample-input');
        const badhotriBox = row.querySelector('.badhotri-box'); 

        // Add Click Listener for persistent highlight/scroll toggle
        badhotriBox.addEventListener('click', toggleScrollAndHighlight);
        
        milkInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                sampleInput.focus(); 
            }
        });

        // Auto-add row on Enter in Sample input 
        sampleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                const nextRow = row.nextElementSibling;
                
                if (nextRow) {
                    // Go to the next row's milk input
                    nextRow.querySelector('.milk-kg-input').focus();
                } else {
                    // If this is the last row, add a new one
                    const currentRows = tableBody.querySelectorAll('.input-row').length;
                    const newSerial = currentRows + 1; 
                    
                    const newRow = createRow(newSerial);
                    tableBody.appendChild(newRow);
                    
                    // Scroll to the bottom to see the new row
                    tableBody.scrollTop = tableBody.scrollHeight;

                    newRow.querySelector('.milk-kg-input').focus();
                    
                    // 🔑 CORRECTED: updateSerialNumbers is NOT needed here if logic in createRow is correct.
                    // But if it was called to fix numbering issues, it should be here. 
                    // Let's rely on createRow getting the correct serial (currentRows + 1)
                }
            }
        });
        
        return row;
    }

    function initializeTable(reset = true) {
        if (reset) {
            tableBody.innerHTML = '';
        }
        
        const existingRows = tableBody.querySelectorAll('.input-row');
        const currentCount = existingRows.length;

        // Ensure at least 1 row exists
        if (currentCount === 0) {
            const newRow = createRow(1);
            tableBody.appendChild(newRow);
            // newRow.querySelector('.milk-kg-input').focus(); 
        } else {
            // If not resetting, just update serial numbers to ensure they are 1, 2, 3...
            updateSerialNumbers();
        }

        updateCalculations();
    }
    
    // --- EVENT LISTENERS AND SETUP ---
    
    // Clear Button Listener to open modal
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
             clearAllModal.style.display = 'block';
        });
    }
    
    // Clear All Modal Logic
    clearCloseBtn.addEventListener('click', () => clearAllModal.style.display = 'none');
    clearCancelBtn.addEventListener('click', () => clearAllModal.style.display = 'none');
    
    clearConfirmBtn.addEventListener('click', () => {
         clearAllInputs(); 
         clearAllModal.style.display = 'none';
    });
    
    // Custom Alert Modal Logic 
    alertCloseBtn.addEventListener('click', () => errorAlertModal.style.display = 'none');
    alertOkBtn.addEventListener('click', () => errorAlertModal.style.display = 'none');
    
    // Delete Lines Button Listener (Main Page) - Direct Call 
    if (deleteLinesBtn && deleteStartInput && deleteEndInput) {
        deleteLinesBtn.addEventListener('click', deleteLinesByRange);
        
        // Add Enter key listener for convenience (optional)
        deleteEndInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
                 deleteLinesByRange();
             }
        });
        deleteStartInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
                 // If only start is entered, treat it as a single deletion and trigger the function
                 if (deleteEndInput.value === '') {
                     deleteLinesByRange();
                 } else {
                     deleteEndInput.focus();
                 }
             }
        });
        
    }

    // Modal Open/Close
    openSettingsBtn.addEventListener('click', () => settingsModal.style.display = 'block');
    settingsCloseBtn.addEventListener('click', () => settingsModal.style.display = 'none');
    
    // Help Center Modal
    helpCenterBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none'; 
        helpCenterModal.style.display = 'block'; 
    });
    helpCenterCloseBtn.addEventListener('click', () => helpCenterModal.style.display = 'none');
    
    // Share App Modal - **REMOVED**
    // openShareModalBtn.addEventListener('click', () => {
    //     settingsModal.style.display = 'none'; 
    //     shareAppModal.style.display = 'block'; 
    //     appLinkDisplay.value = APP_URL; 
    // });
    // shareAppCloseBtn.addEventListener('click', () => shareAppModal.style.display = 'none');

    // Close Modals on outside click 
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (event.target === helpCenterModal) {
            helpCenterModal.style.display = 'none';
        }
        // if (event.target === shareAppModal) { // Removed
        //     shareAppModal.style.display = 'none';
        // }
        if (event.target === clearAllModal) {
            clearAllModal.style.display = 'none';
        }
        if (event.target === errorAlertModal) {
            errorAlertModal.style.display = 'none';
        }
    });
    
    // Dark Mode Toggle - **REMOVED**
    // darkModeToggle.addEventListener('change', () => {
    //     const mode = darkModeToggle.checked ? 'enabled' : 'disabled';
    //     appBody.classList.toggle('dark-mode', darkModeToggle.checked);
    //     localStorage.setItem('darkMode', mode);
    // });
    
    // Language Change Listener
    languageSelect.addEventListener('change', () => {
        const newLang = languageSelect.value;
        localStorage.setItem('appLanguage', newLang);
        applyLanguage(newLang); 
    });

    // --- Share Modal Functionality - **REMOVED** ---
    
    // 1. Copy Button Logic - **REMOVED**
    // copyLinkBtn.addEventListener('click', () => { ... });

    // 2. Direct Share to WhatsApp - **REMOVED**
    // const shareWhatsappBtn = document.getElementById('share-whatsapp-btn');
    // if (shareWhatsappBtn) { ... }
    
    // 3. Direct Share to Telegram - **REMOVED**
    // const shareTelegramBtn = document.getElementById('share-telegram-btn');
    // if (shareTelegramBtn) { ... }

    // --- Help Center Form Logic (1000 Char Limit & Mailto) ---
    const MAX_CHARS = 1000;

    function updateCharCount() {
        const currentLength = problemDescription.value.length;
        
        if (currentLength > MAX_CHARS) {
            problemDescription.value = problemDescription.value.substring(0, MAX_CHARS);
        }
        
        charCountDisplay.textContent = problemDescription.value.length;
    }
    
    problemDescription.addEventListener('input', updateCharCount);

    // Form Submission (Mailto Functionality)
    helpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentLang = languageSelect.value;
        const t = translations[currentLang];
        
        const recipientEmail = 'milkscale.help.request@gmail.com'; 
        
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();
        const phone = userPhoneInput.value.trim();
        const problem = problemDescription.value.trim();
        
        if (problem.length < 1) {
            showAlert(t.form_error_no_problem); 
            return;
        }

        // Construct the email body
        const emailBody = `
==============================
User Details:
==============================
Name: ${name}
Email: ${email}
Phone: ${phone}
Language: ${currentLang}
Date/Time: ${new Date().toLocaleString()}
==============================
Problem Description:
==============================
${problem}
==============================
`;
        
        const subject = encodeURIComponent(t.email_subject);
        const body = encodeURIComponent(emailBody);
        
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        
        setTimeout(() => {
            helpCenterModal.style.display = 'none';
            helpForm.reset();
            updateCharCount(); 
            
            // Delete count input ko bhi reset karo 
            if (deleteStartInput) deleteStartInput.value = '';
            if (deleteEndInput) deleteEndInput.value = '';

        }, 500);
    });

    // Calculation Triggers
    ratePerKgInput.addEventListener('input', updateCalculations);
    
    // --- Initial Load Sequence ---
    // Dark Mode check removed as the feature is removed
    // if (localStorage.getItem('darkMode') === 'enabled') { ... }
    
    const storedLang = localStorage.getItem('appLanguage') || 'hi';
    languageSelect.value = storedLang;

    // Apply language and initialize everything on load
    applyLanguage(storedLang); 
    updateCharCount(); 
});
