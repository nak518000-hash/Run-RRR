document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const tableBody = document.getElementById('table-body');
    const ratePerKgInput = document.getElementById('rate-per-kg');
    const finalPriceDisplay = document.getElementById('final-price'); 
    const totalAmountBox = document.querySelector('.total-amount-box'); 
    
    // TARGET ELEMENTS FOR DYNAMIC LAYOUT/HEIGHT
    const resultsSection = document.querySelector('.results-section'); 
    
    const totalMilkKgDisplay = document.getElementById('total-milk-kg');
    const totalBadhotriGmDisplay = document.getElementById('total-badhotri-gm');
    
    const combinedTotalValueDisplay = document.getElementById('combined-total-value'); 
    const quantityForRateDisplay = document.getElementById('quantity-for-rate');
    const rateSectionTitle = document.getElementById('rate-section-title'); 
    const combinedLabelDisplay = document.querySelector('.total-combined .combined-label');
    
    // Settings elements
    const settingsModal = document.getElementById('settings-modal');
    const openSettingsBtn = document.getElementById('open-settings-btn');
    const settingsCloseBtn = document.getElementById('settings-close-btn'); 
    const languageSelect = document.getElementById('language-select');
    const helpCenterBtn = document.getElementById('help-center-btn'); 
    
    // Clear Button Element
    const clearAllBtn = document.getElementById('clear-all-btn'); 

    // Clear All Modal Elements
    const clearAllModal = document.getElementById('clear-all-modal'); 
    const clearCloseBtn = document.getElementById('clear-close-btn');   
    const clearCancelBtn = document.getElementById('clear-cancel-btn'); 
    const clearConfirmBtn = document.getElementById('clear-confirm-btn'); 

    // Line Delete Elements
    const deleteStartInput = document.getElementById('delete-start-serial'); 
    const deleteEndInput = document.getElementById('delete-end-serial');   
    const deleteLinesBtn = document.getElementById('delete-lines-btn-main'); 

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
    
    // --- Core App Link and Text ---
    const APP_URL = 'https://your-domain.com/app-apk.apk'; 
    
    // Scrolling animation duration for individual badhotri boxes
    const SCROLL_ANIMATION_DURATION = '13.431s'; 
    
    // --- LAYOUT CONSTANTS ---
    const NBSP = '&nbsp;';
    
    // --- CALCULATION CONSTANTS (बदलाव यहाँ) ---
    // सभी गणनाओं में BigInt का उपयोग किया गया है
    const MAX_DIGITS_SMALL_BOX = 7; 
    const MAX_DIGITS_MILK_WARNING = 10; 
    const MAX_DIGITS_BADHOTRI_WARNING = 15; 
    const MAX_DIGITS_PRICE_WARNING = 14; 
    
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
            change_language_label: 'भाषा बदलें',
            help_center_btn: 'सहायता केंद्र', 
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
            
            // Large Number Warning
            number_too_large: 'संख्या बहुत बड़ी है', 
            price_too_large: 'संख्या बहुत बड़ी है', 

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
            change_language_label: 'Change Language',
            help_center_btn: 'Help Center', 
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
            
            // Large Number Warning
            number_too_large: 'Number is very large', 
            price_too_large: 'The number is very large', 
            
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
                 let currentTooltip = element.querySelector('.copy-tooltip');
                 if (!currentTooltip) {
                     currentTooltip = document.createElement('span');
                     currentTooltip.className = 'copy-tooltip';
                     currentTooltip.id = 'copy-tooltip';
                     currentTooltip.dataset.key = 'copy_success_tooltip';
                     element.appendChild(currentTooltip);
                 }
                 currentTooltip.textContent = t.copy_success_tooltip;
                 element.innerHTML = `📋${currentTooltip.outerHTML}`; 
            } else if (element.id === 'copy-tooltip') {
                 element.textContent = translation;
            } else if (element.id === 'delete-lines-btn-main' || element.id === 'clear-all-btn' || element.id === 'clear-cancel-btn' || element.id === 'clear-confirm-btn' || element.id === 'alert-ok-btn') {
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
    
    // --- UTILITY FUNCTIONS (UPDATED FOR FULL BigInt ACCURACY) ---
    
    // Parses number inputs (like Delete Serials) which are small enough
    function parseInputToNumber(value) {
        let cleaned = value.toString().replace(/[eE,]/g, '').replace(/[^0-9.]/g, '');
        if (cleaned.endsWith('.')) {
            cleaned = cleaned.slice(0, -1);
        }
        return parseFloat(cleaned) || 0;
    }
    
    // NEW FUNCTION: Parses MILK/SAMPLE/RATE inputs to BigInt
    // precision: 2 for Milk/Sample/Combined (Value * 100), 4 for Rate (Value * 10000)
    function parseInputToBigInt(value, precision = 2) {
        let cleaned = value.toString().replace(/[eE,]/g, '').replace(/[^0-9.]/g, '');
        
        if (cleaned === '') return 0n; 

        const parts = cleaned.split('.');
        let integerPart = parts[0] || '0';
        
        // Pad and truncate decimal part based on required precision
        let decimalPart = (parts[1] || '').padEnd(precision, '0').substring(0, precision); 
        
        const bigIntString = integerPart + decimalPart;
        
        try {
             return BigInt(bigIntString);
        } catch (e) {
             console.error("BigInt conversion failed:", e);
             return 0n;
        }
    }

    // NEW FUNCTION: Formats BigInt into a decimal string (BigInt / Divisor)
    // precision: 2 for Milk/Combined (Output in X.XX format), 0 for Gm (Output in X format)
    function formatBigIntToNumberString(bigIntValue, precision = 2) {
        if (bigIntValue === 0n) return '0';
        
        const divisor = BigInt(10 ** precision); // e.g., 100n for precision 2
        const isNegative = bigIntValue < 0n;
        const absoluteBigInt = isNegative ? -bigIntValue : bigIntValue;
        
        // Integer division to get the part before the decimal
        const integerPart = absoluteBigInt / divisor;
        
        // Modulo to get the part after the decimal
        const decimalPart = absoluteBigInt % divisor;
        
        // Format the decimal part, padded with zeros
        const decimalString = decimalPart.toString().padStart(precision, '0');
        
        let result;
        if (precision === 0) {
            result = integerPart.toString();
        } else {
             result = integerPart.toString() + '.' + decimalString;
        }
        
        // Remove trailing zeros (e.g., 5.00 -> 5) for Milk/Combined (Precision 2)
        if (precision === 2) { 
             result = result.replace(/(\.0+|0+)$/, '');
        }

        return isNegative ? `-${result}` : result;
    }
    
    // Toggle Scroll and Highlight Function
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
    // Calculates Badhotri in BigInt units (Gm - no implied decimals)
    function calculateBadhotri(sampleBigInt, milkKgBigInt) {
        // sampleBigInt is Sample * 100 (precision 2)
        // milkKgBigInt is MilkKg * 100 (precision 2)
        
        // Formula: Badhotri Gm = (Sample - 65) * 15 * MilkKg
        
        // Step 1: Sample - 65. Unit: Sample*100 - 6500 (precision 2)
        const SIXTY_FIVE_HUNDRED = 6500n; 
        const sampleValueMinus65 = sampleBigInt - SIXTY_FIVE_HUNDRED; 
        
        // Step 2: (Sample*100 - 6500) * 15. Unit: (Value * 100 * 15)
        const factor15 = sampleValueMinus65 * 15n;
        
        // Step 3: factor15 * MilkKg. Unit: (Value * 100 * 15) * (Kg * 100) = Result * 150000
        // Correct approach: To get the final result in integer Gm (precision 0), we need to divide by the total precision multiplier, which is 100 * 100 = 10000n.
        // Badhotri Gm = ( (Sample*100 - 6500) * 15 * (MilkKg*100) ) / 10000
        
        const badhotriGmBigInt_temp = factor15 * milkKgBigInt; 
        
        // The division factor is 100n (from Sample precision) * 100n (from MilkKg precision) = 10000n
        const badhotriGmBigInt = badhotriGmBigInt_temp / 10000n;
        
        // The result is an exact integer in Gm.
        return badhotriGmBigInt; 
    }
    
    // NEW FUNCTION: RE-INDEXES SERIAL NUMBERS
    function updateSerialNumbers() {
        const rows = tableBody.querySelectorAll('.input-row');
        rows.forEach((row, index) => {
             const newSerial = index + 1;
             row.dataset.serial = newSerial;
             const serialCell = row.querySelector('.cell:first-child');
             if (serialCell) {
                 serialCell.textContent = newSerial;
             }
        });
    }
    
    // Function: Clear All Inputs
    function clearAllInputs() {
        const allInputs = document.querySelectorAll('.milk-kg-input, .sample-input, #rate-per-kg');
        allInputs.forEach(input => {
            input.value = '';
        });
        
        deleteStartInput.value = '';
        deleteEndInput.value = '';
        
        updateCalculations();
        
        document.querySelectorAll('.badhotri-box').forEach(box => {
            box.classList.remove('highlight-border');
            const scrollingText = box.querySelector('.scrolling-text');
            if (scrollingText) {
                 scrollingText.style.animationPlayState = 'running';
            }
            box.removeAttribute('title');
        });
        
        initializeTable(true);
    }

    function updateCalculations() {
        let totalMilkKgBigInt = 0n; // Total Milk in Kg * 100 units 
        let totalBadhotriGmBigInt = 0n; // Total Badhotri in Gm units (BigInt)
        
        const currentLang = languageSelect.value || 'hi';
        const t = translations[currentLang];
        
        // --- Reset Price Warning Class ---
        totalAmountBox.classList.remove('warning-price-large'); 

        const inputRows = tableBody.querySelectorAll('.input-row');
        inputRows.forEach(row => {
            const milkKgInput = row.querySelector('.milk-kg-input');
            const sampleInput = row.querySelector('.sample-input');
            const badhotriBox = row.querySelector('.badhotri-box'); 
            const scrollingText = badhotriBox.querySelector('.scrolling-text');
            
            const milkKgRawValue = milkKgInput.value.trim();
            const sampleRawValue = sampleInput.value.trim();
            
            // Parse inputs as BigInt with 2 decimal precision (Value * 100)
            const milkKgBigInt = parseInputToBigInt(milkKgRawValue, 2); 
            // Sample is typically integer, but handle up to 2 decimals for input flexibility
            const sampleBigInt = parseInputToBigInt(sampleRawValue, 2); 
            
            // ONLY ADD MILK KG TO TOTAL MILK if the input is non-empty
            if (milkKgRawValue !== '') {
                 totalMilkKgBigInt += milkKgBigInt;
            }
            
            if (milkKgRawValue === '' || sampleRawValue === '') {
                scrollingText.textContent = '---';
                badhotriBox.classList.add('static-box');
                badhotriBox.classList.remove('positive', 'negative', 'highlight-border'); 
                scrollingText.style.animation = 'none'; 
                return; 
            }

            // Badhotri is calculated in exact Gm units (BigInt)
            const badhotriGmBigInt = calculateBadhotri(sampleBigInt, milkKgBigInt); 
            
            // Format Gm (precision 0)
            const badhotriGmDisplay = formatBigIntToNumberString(badhotriGmBigInt, 0); 
            scrollingText.innerHTML = `${badhotriGmDisplay}${NBSP}Gm`; 
            
            badhotriBox.classList.remove('positive', 'negative', 'static-box'); 
            
            const rawDisplayValue = badhotriGmDisplay.replace('-', '');
            
            if (badhotriGmBigInt === 0n) {
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
                
                if (rawDisplayValue.length > MAX_DIGITS_SMALL_BOX) { 
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
                
                totalBadhotriGmBigInt += badhotriGmBigInt;
            }
        });
        
        // --- TOTAL CALCULATIONS & LAYOUT LOGIC ---
        
        // 1. Calculate and Format Totals
        
        // Format Total Milk (Kg) from Kg*100 BigInt (Precision 2)
        const totalMilkKgDisplayValue = formatBigIntToNumberString(totalMilkKgBigInt, 2); 
        
        // Format Total Badhotri (Gm) from Gm BigInt (Precision 0)
        const totalBadhotriGmDisplayValue = formatBigIntToNumberString(totalBadhotriGmBigInt, 0);

        // 2. Check Length Requirement
        const milkLengthString = totalMilkKgDisplayValue.replace('-', '').replace('.', '');
        const milkLength = milkLengthString.length;
        const badhotriLengthString = totalBadhotriGmDisplayValue.replace('-', ''); 
        const badhotriLength = badhotriLengthString.length;
        
        const shouldStack = milkLength > MAX_DIGITS_SMALL_BOX || badhotriLength > MAX_DIGITS_SMALL_BOX;

        // 3. Apply/Remove Full-Width Stack Class
        if (shouldStack) {
            resultsSection.classList.add('full-width-stack');
        } else {
            resultsSection.classList.remove('full-width-stack');
        }
        
        // 4. Update Display with formatted text (Kg/Gm unit)
        
        // --- NEW LOGIC FOR TOTAL MILK WARNING ---
        let hasWarning = false; 
        if (milkLength > MAX_DIGITS_MILK_WARNING) { 
             totalMilkKgDisplay.textContent = t.number_too_large;
             totalMilkKgDisplay.classList.add('warning-text-large');
             totalMilkKgDisplay.classList.remove('big-blue-text'); 
             hasWarning = true;
        } else {
             totalMilkKgDisplay.classList.remove('warning-text-large');
             totalMilkKgDisplay.classList.add('big-blue-text');
             
             const totalMilkText = `${totalMilkKgDisplayValue}${NBSP}Kg`;
             totalMilkKgDisplay.innerHTML = totalMilkText;
        }

        // --- LOGIC FOR TOTAL BADHOTRI WARNING ---
        if (badhotriLength > MAX_DIGITS_BADHOTRI_WARNING) { 
             totalBadhotriGmDisplay.textContent = t.number_too_large;
             totalBadhotriGmDisplay.classList.add('warning-text-large');
             totalBadhotriGmDisplay.classList.remove('big-green-text', 'green-text', 'red-text'); 
             hasWarning = true;
        } else {
             totalBadhotriGmDisplay.classList.remove('warning-text-large');
             totalBadhotriGmDisplay.classList.add('big-green-text'); 
             
             const totalBadhotriText = `${totalBadhotriGmDisplayValue}${NBSP}Gm`;
             totalBadhotriGmDisplay.innerHTML = totalBadhotriText;
             
             totalBadhotriGmDisplay.classList.remove('green-text', 'red-text');
             if (totalBadhotriGmBigInt > 0n) {
                 totalBadhotriGmDisplay.classList.add('green-text');
             } else if (totalBadhotriGmBigInt < 0n) {
                 totalBadhotriGmDisplay.classList.add('red-text'); 
             } else {
                  totalBadhotriGmDisplay.classList.add('green-text'); 
             }
        }
        
        // --- COMMON WARNING HANDLER ---
        if (hasWarning) {
             combinedTotalValueDisplay.innerHTML = `---${NBSP}Kg`;
             quantityForRateDisplay.textContent = `(---)`;
             finalPriceDisplay.textContent = '0';
             return; 
        }
        
        // 5. Combined and Price Calculations 
        
        // Convert Badhotri Gm (integer) to Kg*100 BigInt units (precision 2)
        // Gm to Kg: Gm / 1000.  In BigInt*100 units: (Gm * 100) / 1000 = Gm / 10n
        // We use integer division (which truncates the result).
        const badhotriInKgBigInt = totalBadhotriGmBigInt / 10n; 
        
        // Combined Total is in Kg*100 BigInt units (precision 2)
        let combinedTotalBigInt = totalMilkKgBigInt + badhotriInKgBigInt;
        
        const combinedTotalValue = formatBigIntToNumberString(combinedTotalBigInt, 2); 
        combinedTotalValueDisplay.innerHTML = `${combinedTotalValue}${NBSP}Kg`;

        // --- FULL BigInt PRICE CALCULATION (सही गुणा यहाँ किया गया है) ---
        
        // 1. Rate को BigInt में parse करें (4 दशमलव स्थानों की सटीकता के साथ: Rate * 10000)
        const rateBigInt = parseInputToBigInt(ratePerKgInput.value, 4) || 0n;
        
        // 2. Price Calculation: 
        // combinedTotalBigInt unit: Kg*100 (precision 2)
        // rateBigInt unit: Rate*10000 (precision 4)
        // Multiplication result: Price * (100 * 10000) = Price * 1000000
        
        const PRICE_DIVISOR = 1000000n; // 100 * 10000
        let finalPriceBigInt_temp = combinedTotalBigInt * rateBigInt;

        // Round to the nearest whole rupee/paise (2 decimals of the final price).
        // Since finalPriceBigInt_temp is Price * 1000000, we need to divide by 10000 to get Price * 100 (2 implied decimals)
        // For correct rounding: add half of the divisor before division.
        const HALF_DIVISOR = PRICE_DIVISOR / 2n;
        
        // finalPriceBigInt_rounded is the Price * 100 BigInt (with correct rounding)
        let finalPriceBigInt_rounded = (finalPriceBigInt_temp + HALF_DIVISOR) / PRICE_DIVISOR;

        // 3. Format final price to exactly 2 decimal places
        
        const isNegative = finalPriceBigInt_rounded < 0n;
        const absoluteBigInt = isNegative ? -finalPriceBigInt_rounded : finalPriceBigInt_rounded;
        
        const stringValue = absoluteBigInt.toString();
        
        // Format to exactly 2 decimals (Price*100 -> X.XX)
        const finalPriceValue = (isNegative ? '-' : '') + (stringValue.length < 3 ? 
            '0.' + stringValue.padStart(2, '0') : 
            stringValue.slice(0, -2) + '.' + stringValue.slice(-2)
        );
        
        // --- END OF FULL BigInt PRICE CALCULATION ---
        
        quantityForRateDisplay.textContent = `(${combinedTotalValue})`;
        finalPriceDisplay.textContent = `${finalPriceValue}`;
        
        // NEW: FINAL PRICE WARNING LOGIC 
        // priceLength is checked against the final formatted string value (max 14 integer digits)
        const priceIntegerPart = finalPriceValue.split('.')[0].replace('-', '');
        const priceLength = priceIntegerPart.length;

        if (priceLength > MAX_DIGITS_PRICE_WARNING) { 
             finalPriceDisplay.textContent = t.price_too_large;
             totalAmountBox.classList.add('warning-price-large');
        } else {
             totalAmountBox.classList.remove('warning-price-large');
        }
    }

    function createRow(serial) {
        const row = document.createElement('div');
        row.classList.add('input-row');
        row.dataset.serial = serial;
        
        const currentLang = languageSelect.value || 'hi';
        const t = translations[currentLang];
        
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

        badhotriBox.addEventListener('click', toggleScrollAndHighlight);
        
        milkInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                sampleInput.focus(); 
            }
        });

        sampleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                const nextRow = row.nextElementSibling;
                
                if (nextRow) {
                    nextRow.querySelector('.milk-kg-input').focus();
                } else {
                    const currentRows = tableBody.querySelectorAll('.input-row').length;
                    const newSerial = currentRows + 1; 
                    
                    const newRow = createRow(newSerial);
                    tableBody.appendChild(newRow);
                    
                    tableBody.scrollTop = tableBody.scrollHeight;

                    newRow.querySelector('.milk-kg-input').focus();
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

        if (currentCount === 0) {
            const newRow = createRow(1);
            tableBody.appendChild(newRow);
        } else {
            updateSerialNumbers();
        }

        updateCalculations();
    }
    
    // --- EVENT LISTENERS AND SETUP ---
    
    // Function to handle line deletion
    function deleteLinesByRange() {
        const start = parseInputToNumber(deleteStartInput.value);
        const end = parseInputToNumber(deleteEndInput.value) || start; // If end is empty, delete only the start line
        
        const rows = tableBody.querySelectorAll('.input-row');
        
        if (start < 1 || start > rows.length) {
            showAlert(`कृपया 1 और ${rows.length} के बीच एक मान्य संख्या डालें।`);
            return;
        }
        
        if (end < start || end > rows.length) {
            showAlert(`समाप्ति संख्या (${end}) शुरू संख्या (${start}) से बड़ी होनी चाहिए और ${rows.length} से ज़्यादा नहीं होनी चाहिए।`);
            return;
        }

        const rowsToDelete = [];
        for (let i = start - 1; i < end; i++) {
            rowsToDelete.push(rows[i]);
        }
        
        rowsToDelete.forEach(row => row.remove());

        // Reset the input fields
        deleteStartInput.value = '';
        deleteEndInput.value = '';

        // Re-index and recalculate
        updateSerialNumbers();
        updateCalculations();
        
        // Ensure at least one row remains
        initializeTable(false);
    }
    
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
    
    // Delete Lines Button Listener (Main Page)
    if (deleteLinesBtn && deleteStartInput && deleteEndInput) {
        deleteLinesBtn.addEventListener('click', deleteLinesByRange);
        
        deleteEndInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
                 deleteLinesByRange();
             }
        });
        deleteStartInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
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
    
    // Close Modals on outside click 
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (event.target === helpCenterModal) {
            helpCenterModal.style.display = 'none';
        }
        if (event.target === clearAllModal) {
            clearAllModal.style.display = 'none';
        }
        if (event.target === errorAlertModal) {
            errorAlertModal.style.display = 'none';
        }
    });
    
    // Language Change Listener
    languageSelect.addEventListener('change', () => {
        const newLang = languageSelect.value;
        localStorage.setItem('appLanguage', newLang);
        applyLanguage(newLang); 
    });

    // --- Help Center Form Logic ---
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
            
            if (deleteStartInput) deleteStartInput.value = '';
            if (deleteEndInput) deleteEndInput.value = '';

        }, 500);
    });

    // Calculation Triggers
    ratePerKgInput.addEventListener('input', updateCalculations);
    
    // --- Initial Load Sequence ---
    
    const storedLang = localStorage.getItem('appLanguage') || 'hi';
    languageSelect.value = storedLang;

    // Apply language and initialize everything on load
    applyLanguage(storedLang); 
    updateCharCount(); 
});
