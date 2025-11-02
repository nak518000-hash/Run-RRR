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
            
            const badhotriGmDisplay = badhotriGmBigInt.toString();
            scrollingText.innerHTML = `${badhotriGmDisplay}${NBSP}Gm`; 
            
            badhotriBox.classList.remove('positive', 'negative', 'static-box'); 
            
            const rawDisplayValue = badhotriGmDisplay;
            
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
        const totalBadhotriGmDisplayValue = totalBadhotriGmBigInt.toString();

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
             finalPriceDisplay.textContent = '0.00'; // Show 0.00 when totals are huge
             totalAmountBox.classList.remove('warning-price-large'); 
             return; 
        }
        
        // 5. Combined and Price Calculations 
        
        // Convert Badhotri Gm to Kg*100 BigInt units for addition: (Gm * 10) / 1000 * 100
        // Correct way to convert Gm (integer) to Kg*100 (precision 2): Gm * 100 / 1000 = Gm / 10n
        const badhotriInKgBigInt = totalBadhotriGmBigInt / 10n; 
        
        // Combined Total is in Kg*100 BigInt units (precision 2)
        let combinedTotalBigInt = totalMilkKgBigInt + badhotriInKgBigInt;
        
        const combinedTotalValue = formatBigIntToNumberString(combinedTotalBigInt, 2); 
        combinedTotalValueDisplay.innerHTML = `${combinedTotalValue}${NBSP}Kg`;

        // --- FULL BigInt PRICE CALCULATION (सुधार यहाँ किया गया है) ---
        
        // 1. Rate को BigInt में parse करें (4 दशमलव स्थानों की सटीकता के साथ: Rate * 10000)
        const rateBigInt = parseInputToBigInt(ratePerKgInput.value, 4) || 0n;
        
        // 2. Price Calculation: 
        // combinedTotalBigInt unit: Kg*100 (precision 2)
        // rateBigInt unit: Rate*10000 (precision 4)
        // Multiplication result: Price * (100 * 10000) = Price * 1000000
        
        const PRICE_DIVISOR = 1000000n; 
        let finalPriceBigInt_temp = (combinedTotalBigInt * rateBigInt);

        // Round to the nearest whole rupee/paise (2 decimals).
        // To get Price * 100 (2 implied decimals), we need to divide by 10000 (1000000 / 100).
        const ROUNDING_DIVISOR = 10000n;
        const HALF_ROUNDING_DIVISOR = ROUNDING_DIVISOR / 2n;

        // Price * 100 BigInt (with correct rounding)
        // Handle negative numbers for correct rounding (add/subtract half)
        let finalPriceBigInt_rounded;
        if (finalPriceBigInt_temp >= 0n) {
             finalPriceBigInt_rounded = (finalPriceBigInt_temp + HALF_ROUNDING_DIVISOR) / ROUNDING_DIVISOR;
        } else {
             // For negative, subtract the half divisor for rounding away from zero
             finalPriceBigInt_rounded = (finalPriceBigInt_temp - HALF_ROUNDING_DIVISOR) / ROUNDING_DIVISOR;
        }

        // 3. Format final price (which is in Price*100 BigInt units) to EXACTLY 2 decimal places
        
        const isNegative = finalPriceBigInt_rounded < 0n;
        const absoluteBigInt = isNegative ? -finalPriceBigInt_rounded : finalPriceBigInt_rounded;
        
        const stringValue = absoluteBigInt.toString();
        
        // Format to exactly 2 decimals
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

