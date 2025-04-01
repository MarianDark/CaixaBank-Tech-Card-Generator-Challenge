# 💳 Frontend React - Round 3 🏦

### Category ➡️ Software

### Subcategory ➡️ React Frontend

### Difficulty ➡️ Medium

### Expected max solution time ➡️ 1.5 to 2 hours

---

## 🌐 Background

In this challenge, you will build a **card management system**, where users can generate, verify, and visualize different types of payment cards dynamically. The challenge evaluates **React, Material UI (MUI), state management, animations, and mathematical logic**.

## 📂 Repository Structure

A repository tree is provided below and should not be modified. Everything you need to develop the challenge is already included.

```bash
caixabank-react-round3/
├── public/
│   ├── caixabank-tech-logo.png
│   ├── nuwe-logo.png
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── components/
│   │   ├── CardBack.js
│   │   ├── CardChip.js
│   │   ├── CardEditControls.js
│   │   ├── CardFront.js
│   │   ├── CardGenerator.js
│   │   ├── CardList.js
│   │   ├── CardStripe.js
│   │   ├── ContactlessIcon.js
│   │   ├── CustomCard.js
│   │   ├── CVVBox.js
│   │   ├── Header.js
│   │   └── Layout.js
│   ├── context/
│   │   └── CardsContext.js
│   ├── services/
│   │   └── fetchCVV.js 
│   └── utils/
│       ├── calculateCVV.js
│       ├── calculateExpirationDate.js
│       ├── generateCardColors.js
│       ├── generateLuhnCardNumber.js
│       └── getNotch.js 
├── .gitignore
├── babel.config.js
├── cypress.config.js
├── jest.config.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚠️ Important Notice

**Only the files explicitly mentioned in the tasks should be modified.**

**Do not remove any `data-testid` props from the components that are already created. These attributes are essential for automated testing and evaluation. Any changes or deletions could result in incorrect assessment of your implementation. Please ensure they remain intact.**

---

## **🎯 Task 1: Global State Management**
### 📌 **Objective**
Implement **React Context API** to **store and manage multiple cards**, ensuring **persistent state management** across the application.

### 🔹 **What needs to be implemented?**
- Implement a **global state** to manage **card storage, addition, and removal**.
- Store up to **10 cards** in the system.
- Ensure that **users can remove cards** and free up space to generate new ones.
- Provide functions to **add, remove, and retrieve cards**.

### 📌 **State Management Behavior**
- The **context should store an array of cards** with properties:
      - `id`: Unique identifier for the card.
      - `number`: Card number.
      - `type`: Card type (`credit`, `debit`, `prepaid`).
      - `expiration`: Expiration date.
      - `cvv`: CVV code.
      - `background`: Card background color.
      - `font`: Selected font style.
- Provide methods:
      - `addCard(card)`: Adds a new card (if the limit is not reached).
      - `removeCard(id)`: Removes a card by ID.
      - `getCards()`: Returns the list of saved cards.
- Ensure that state updates correctly when a **card is added or removed**.

### 🔹 **Using UUID for Unique Identifiers**
- To facilitate card management, you may use the **`uuid` library** to generate unique card IDs.

### 📌 **Implementation**
- The **state management logic** should be implemented in:  
      - **📄 `src/context/CardContext.js`**  
- The **global state should be consumed in**:
      - **📄 `src/components/CardGenerator.js`** → To add new cards.
      - **📄 `src/components/CustomCard.js`** → To remove cards.
      - **📄 `src/components/CardList.js`** → To display stored cards.

---

## **🎯 Task 2: Card Number Generation & Validation**
### 📌 **Objective**
Allow users to **select a card type** and **generate a valid card number** dynamically.

### 🔹 **What needs to be implemented?**
- Users must be able to **select a card type** (`credit`, `debit`, `prepaid`) before generating a new card.
- Implement a function that **generates a random valid card number**.
- The generated number **must always be valid** according to **Luhn’s Algorithm**.
- Ensure that **every new generation creates a different card number**.
- The card number must be **visually displayed** on the **front of the card**.
- The card number **should be formatted into groups of four digits**, but **only for display purposes**.

### 📌 **Luhn Algorithm Formula**
- **Generate a random number for all digits except the last one**.
- **Calculate the last digit (checksum) to make the number valid**:
      - **Starting from the rightmost digit (excluding the checksum), double every second digit**.
      - **If the result is greater than 9, subtract 9** (or sum its digits).
      - **Sum all digits together**.
      - **The last digit (checksum) should make the total a multiple of 10**.
- **Append the calculated checksum as the last digit** to complete the card number.

### 🔹 **Example Calculation**
If the first 15 digits generated are **`492156789012345`**, we apply the Luhn Algorithm:

- Starting from the **rightmost digit** (before the checksum), double every second digit:
      - `Original: 4 9 2 1 5 6 7 8 9 0 1 2 3 4 5`
      - `Doubled: 4 18 2 2 5 12 7 16 9 0 1 4 3 8 5`
- If a doubled digit is greater than 9, subtract 9:
      - `Adjusted: 4 9 2 1 5 6 7 8 9 0 1 2 3 4 5`
      - `After Fix: 4 9 4 1 1 6 5 8 9 0 2 2 6 4 1`
- Sum all the digits:
      - `4 + 9 + 4 + 1 + 1 + 6 + 5 + 8 + 9 + 0 + 2 + 2 + 6 + 4 + 1 = 62`
- Find the checksum (`X`) so that `62 + X` is a multiple of 10:
      - `X = 8 (since 62 + 8 = 70, which is a multiple of 10)`
- The final **valid card number** is **`4921567890123458`**.

### 🔹 **Card Display Requirements**
- The **card number must be visible** in the **CardFront** component.
- The number should be **formatted for display purposes** as `XXXX XXXX XXXX XXXX`.
- The text should be **legible** and properly spaced.

### 📌 **Implementation**
- You must implement this logic in:  
      - **📄 `src/utils/generateLuhnCardNumber.js`** – Implement the function to generate a valid card number.  
      - **📄 `src/components/CardGenerator.js`** – Handle the logic to generate a new card when clicking the button.  
      - **📄 `src/components/CustomCard.js`** – Pass the generated card number to the card component.  
      - **📄 `src/components/CardFront.js`** – Ensure the card number is correctly displayed and formatted for UI purposes.  

### ⚠️ **Function Output Format**  
- The function `generateLuhnCardNumber` must return a **string** representing the **full unformatted card number**.  
- **Example:** `"4921567890123458"` (the number must be returned as a string).

---

## **🎯 Task 2: Card Number Generation & Validation**
### 📌 **Objective**
Allow users to **select a card type** and **generate a valid card number** dynamically.

### 🔹 **What needs to be implemented?**
- Users must be able to **select a card type** (credit, debit, prepaid) before generating a new card.
- Implement a function that **generates a random valid card number**.
- The generated number **must always be valid** according to Luhn’s Algorithm.
- Ensure that **every new generation creates a different card number**.
- The card number must be **visually displayed** on the front of the card.
- The card must have a **masked format**, separating the digits in groups of four.
- The generated card number should be properly aligned and styled within the **CardFront** component.

### 📌 **Luhn Algorithm Formula**
- **Generate a random number for all digits except the last one**.
- **Calculate the last digit (checksum) to make the number valid**:
      - **Multiply every second digit (from the right) by 2.**
      - **If the result is greater than 9, subtract 9.**
      - **Sum all digits.**
      - **The last digit should make the total a multiple of 10.**
- **Return the complete card number.**

### 🔹 **Example**
If the generated base number is **492156789012345X**,  
the last digit `X` should be computed so that the full number is valid.

### 🔹 **Card Display Requirements**
- The **card number must be visible** in the **CardFront** component, formatted as `XXXX XXXX XXXX XXXX`.
- The **font must be customizable**, allowing users to change typography.
- The text should be **legible** and properly spaced.

### 📌 **Implementation**
- You must implement this logic in:  
      - **📄 `src/utils/generateLuhnCardNumber.js`** – Implement the function to generate a valid card number.  
      - **📄 `src/components/CardGenerator.js`** – Handle the logic to generate a new card when clicking the button.  
      - **📄 `src/components/CustomCard.js`** – Pass the generated card number to the card component.  
      - **📄 `src/components/CardFront.js`** – Ensure the card number is correctly displayed and formatted.  

### ⚠️ **Function Output Format**  
- The function `generateLuhnCardNumber` must return a string representing the generated card number.  
      - Example: `"3883473739994312"` (the number must be converted to a string).
- The formatting of the card number into groups of four digits (e.g., `"3883 4737 3999 4312"`) **should only be implemented in** `📄 src/components/CardFront.js`.

---

## **🎯 Task 3: Expiration Date Calculation**
### 📌 **Objective**
Dynamically calculate and display the **expiration date** based on the card number.

### 🔹 **What needs to be implemented?**
- Implement a function that **derives the expiration date from the card number**.
- Ensure the expiration date is **always in the future**.
- Display the **expiration date on the front of the card** in the format `MM/YYYY`.

### 📌 **Expiration Date Formula**
- **Determine the Expiration Year**:
      - Extract the **last two digits** of the card number.
      - Compute the **year offset** as: `(Last Two Digits % 5) + 3`
      - The **expiration year** is calculated as: `Expiration Year = Current Year + (Last Two Digits % 5) + 3`

- **Determine the Expiration Month**:
      - Extract the **first two digits** of the card number.
      - Compute the month as: `Expiration Month = ((First Two Digits) % 12) + 1`
      - This ensures the month is always between **1 and 12**.

### 📌 **Example Calculation**
#### **Card Number:** `4921 5678 9012 3456`
- **Last two digits =** `56`
- **Year offset =** `(56 % 5) + 3 = 4`
- **Expiration year =** `Current Year + 4`

- **First two digits =** `49`
- **Expiration month =** `(49 % 12) + 1 = 2` (February)

**Final Expiration Date (assuming the current year is 2024)**:  
**February 2028** (`02/2028`)

### 📌 **Implementation**
- Implement this logic in:  
      - **📄 `src/utils/calculateExpirationDate.js`**  
- Ensure that the expiration date is displayed on the front of the card in:  
      - **📄 `src/components/CardFront.js`**

### ⚠️ **Function Output Format**
- The function `calculateExpirationDate` must return a string in the following format: `${month}/${year}`

---

## **🎯 Task 4: CVV Calculation & Display**
### 📌 **Objective**
Fetch a **dynamically generated CVV** from an API and display it on the **back of the card**.

### 🔹 **What needs to be implemented?**
- Implement a **service** to fetch the **CVV codes from an API** before assigning it to a new card.
- Implement a **utility function** to correctly **calculate the CVV** from the fetched data.
- Ensure the **CVV is always a 3-digit number (`000-999`)**.
- Display the **CVV on the back of the card** inside a **white box**.
- Include a **CVV label** under the box.

### 📌 **CVV Generation Formula**
1. **Fetch an array of three hexadecimal codes from the API**.
2. **Convert each HEX code to a decimal value**.
3. **Apply XOR (`^`) to combine the three values**.
4. **Apply a bitwise shift (`>> 2`)**.
5. **Ensure the final result is within the range of `000-999`**.

### 📌 **API Endpoint**
- The CVV codes **must be fetched** from the following API endpoint:  

`https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-50deec91-1644-467d-9759-c2eb309d6f91/default/cvv-hex-codes`

### 📌 **Implementation**
- Implement the **service function** to fetch the CVV codes in: **📄 `src/services/fetchCVV.js`**  
      - This function should send a **GET request** to the **provided API URL**.
      - The API response will contain a **`codes` array** with **three hexadecimal values**.
      - This function should **return the fetched array** without modifying it.

- Implement the **utility function** to process the fetched data in: **📄 `src/utils/calculateCVV.js`**  
      - This function should take the **array of hexadecimal values** as input.
      - Convert the values to **decimal** and apply the **formula** to generate the final **CVV**.
      - Ensure the result is a **valid 3-digit number** (`000-999`).

- Ensure that the **CVV is displayed correctly** on the **back of the card** in: **📄 `src/components/CardBack.js`**  
      - The **CVV should be passed as prop to CVVBox component**.

### ⚠️ **Function Output Format**
- The function `calculateCVV` must return a **string** formatted as a **three-digit number** (e.g., `"045"`, `"123"`, `"999"`).
- The output should always have **exactly three digits**, even if the calculated number is less than 100 (e.g., `"005"` instead of `"5"`).

---

## **🎯 Task 5: Card Design & Layout**
### 📌 **Objective**
Design the **front and back layout of the card**, ensuring that all required elements are correctly placed.

### 🔹 **What needs to be implemented?**
- **Front Side:**
      - **Card Type** should be displayed at the top right.
      - **CaixaBank Tech Logo** should be displayed at the top left.
      - **Contactless Icon (📄 `src/components/ContactlessIcon.js`)** should be imported and positioned in the card.
      - **Card Chip (📄 `src/components/CardChip.js`)** should be imported and positioned in the card.
      - **Card Number** should be centered and formatted in groups of four.
      - **Cardholder Name ("JOHN DOE")** should be displayed below the card number.
      - **Expiration Date** should be displayed at the bottom.

- **Back Side:**
      - **Black stripe (📄 `src/components/CardStripe.js`)** at the top.
      - **CVV Box (📄 `src/components/CVVBox.js`)** positioned below the stripe.
      - **CVV Code** displayed inside the CVV Box.
      - **CVV Label ("CVV")** placed under the CVV Box.
      - **NUWE Logo** positioned at the bottom.

### 📌 **Implementation**
- The **front side of the card** should be implemented in:  
      - **📄 `src/components/CardFront.js`**  
- The **back side of the card** should be implemented in:  
      - **📄 `src/components/CardBack.js`**

---

## **🎯 Task 6: Dynamic Styling & Customization**
### 📌 **Objective**
Allow users to **customize their card’s appearance** dynamically.

### 🔹 **What needs to be implemented?**
- **Card Background Customization:**
      - Implement a **color picker** that allows users to choose a **solid background color**.
      - If no custom color is selected, use the **default dynamic gradient background** based on the card number.
      - The background should be generated dynamically using a formula that derives colors from the card number.

- **Typography Selection:**
      - Users should be able to select between **three different fonts** for the card text.
      - The selected font should be applied to:
            - **Card Number**
            - **Cardholder Name**
            - **Expiration Date**
            - **CVV Code**
  
- **Card Removal Functionality:**
  - Implement a **"Remove Card"** button that allows users to delete a stored card.

### 📌 **Formula for Background Colors**
- **Sum all digits of the card number.**
- **Generate two colors:**
      - **Color 1:** `(sum × 3) % 256, (sum × 5) % 256, (sum × 7) % 256`
      - **Color 2:** `(sum × 2) % 256, (sum × 4) % 256, (sum × 6) % 256`
- **Determine opacity for each color dynamically**:
      - Opacity 1: `(sum % 50 + 50) / 100` (ensures a range between 0.5 and 1.0).
      - Opacity 2: `(sum % 30 + 20) / 100` (ensures a range between 0.2 y 0.5).
- **Apply a `linear-gradient` using these colors and opacities**.

### 📌 **Implementation**
- The **card customization controls** should be implemented in:  
      - **📄 `src/components/CardEditControls.js`**

- The **background color customization** should be applied in:  
      - **📄 `src/components/CustomCard.js`**

- The **dynamic background generation logic** should be implemented in:  
      - **📄 `src/utils/generateCardColors.js`**  

### ⚠️ **Function Output Format**
- The function `generateCardColors` must return a string in the following format: `linear-gradient(to bottom, rgba(${r1}, ${g1}, ${b1}, ${opacity1}), rgba(${r2}, ${g2}, ${b2}, ${opacity2}))`

---

## **🎯 Task 7: Card Flip Animation**
### 📌 **Objective**
Implement an **interactive card flip animation** that allows users to view both the **front** and **back** of the card.

### 🔹 **What needs to be implemented?**
- Clicking on a card should **flip** it to reveal the back.
- Clicking again should **flip it back** to the front.
- The **flip animation** must be **smooth and reversible**.
- The transition effect must be **testable** to ensure proper flipping behavior.
- Ensure that both **front and back elements** are styled correctly and hidden when necessary.

### 📌 **Animation Requirements**
- The card must **rotate along the Y-axis** to create a realistic flip effect.
- **CSS Transformations** should be used:
      - `transform-style: preserve-3d`
      - `transform: rotateY(180deg)`
- The **front** and **back** must be positioned **absolutely** inside a relative container.
- The back of the card should have:
      - `transform: rotateY(180deg)`
      - `backface-visibility: hidden`
- The transition should take **0.6s** and use **ease-in-out timing**.

### 📌 **Implementation**
- The **flip animation logic** should be implemented in:  
      - **📄 `src/components/CustomCard.js`**  

- The **front and back card components** should be implemented in:  
      - **📄 `src/components/CardFront.js`**  
      - **📄 `src/components/CardBack.js`**  

---

## **🎯 Task 8: Dynamic Notch Rendering**
### 📌 **Objective**
Ensure that each card type **(Credit, Debit, Prepaid)** has a correctly shaped **notch design**, dynamically applied to the **front and back sides** of the card.

### 🔹 **What needs to be implemented?**
- Implement a **dynamic notch shape** for each card type using **CSS clip-path**.
- The **front notch** should be different for each type:
      - **Credit Card:** Squared notch.
      - **Debit Card:** Rounded notch.
      - **Prepaid Card:** Triangular notch.
- The **back notch** should be a **mirrored version** of the front notch.
- The notch must **automatically adjust** when flipping the card.

### 📌 **Implementation**
- The notch logic must be implemented in:  
      - **📄 `src/utils/getNotch.js`** (Handles the correct notch for each type).
      - **📄 `src/components/CardFront.js`** (Applies the notch on the front side).
      - **📄 `src/components/CardBack.js`** (Applies the mirrored notch on the back side).

### 🔹 **Clip-Path Values for Front-Side Notches**
| **Card Type** | **Front Notch Polygon** |
|--------------|-------------------------------|
| **Debit** | `polygon(100% 0%, 100% 62.84%, 98.18% 66.26%, 97.15% 70%, 97.15% 74.44%, 98.18% 78.14%, 100% 81.53%, 100% 89.55%, 100% 100%, 0% 100%, 0% 70%, 0% 35%, 0% 0%)` |
| **Credit** | `polygon(100% 0%, 100% 62.84%, 97.29% 66.64%, 97.29% 80%, 100% 83.62%, 100% 89.32%, 100% 100%, 0% 100%, 0% 70%, 0% 35%, 0% 0%)` |
| **Prepaid** | `polygon(50% 0%, 100% 0%, 100% 57%, 96.81% 60.84%, 100% 86%, 100% 100%, 0% 100%, 0% 54%, 0% 0%)` |

### 📌 **Mirroring the Notch for the Back Side**
- The **back-side notch** should be a **mirrored version** of the front-side notch.
- This can be achieved by **swapping the X-coordinates** in the clip-path.

#### **Example: Mirroring the Debit Card Notch**

**Front-side notch:**
`polygon(100% 0%, 100% 62.84%, 98.18% 66.26%, 97.15% 70%, 97.15% 74.44%, 98.18% 78.14%, 100% 81.53%, 100% 89.55%, 100% 100%, 0% 100%, 0% 70%, 0% 35%, 0% 0%)`

**Back-side notch (Mirrored version):**
`polygon(0% 0%, 0% 62.84%, 1.82% 66.26%, 2.85% 70%, 2.85% 74.44%, 1.82% 78.14%, 0% 81.53%, 0% 89.55%, 0% 100%, 100% 100%, 100% 70%, 100% 35%, 100% 0%)`

---

## **🎯 Task 9: Cooldown Timer & Card Generation Control**
### 📌 **Objective**
Prevent users from **spamming the card generation** by implementing a **cooldown timer** that restricts new card creation for 10 seconds after each generation.

### 🔹 **What needs to be implemented?**
- Users should **not be able to generate a new card** immediately after creating one.
- A **10-second cooldown** should be enforced before allowing another card generation.
- Display a **countdown timer** indicating the remaining cooldown time.
- The **"Generate Card" button** should be **disabled** while the cooldown is active.
- If the user **reaches the maximum limit (10 cards)**, show an **error message** instead of starting the cooldown.
- The **"Generate Card" button** should also be **disabled when there are 10 stored cards** and should be **re-enabled when a card is removed**.

### 📌 **Cooldown Timer Behavior**
- When a new card is generated:
      - The cooldown **starts at 10 seconds**.
      - The **countdown decreases** every second.
      - The **"Generate Card" button** remains disabled until the cooldown reaches `0`.
- If the user has **10 cards stored**, prevent generation and show an error.
- If the user removes a card, they should be able to generate a new one **without waiting**.

### 📌 **Implementation**
- The **cooldown logic** should be implemented in:  
      - **📄 `src/components/CardGenerator.js`**  

---

## **🎯 Task 10: Performance Optimization**
### 📌 **Objective**
Optimize the **React application performance** by minimizing unnecessary **re-renders**, improving efficiency, and ensuring smooth interactions.

### 🔹 **What needs to be implemented?**
- Use **React.memo** to prevent unnecessary re-renders of **static components**.
- Use **useCallback** to optimize event handlers inside interactive components.
- Use **useMemo** to cache expensive calculations such as:
      - Generating card colors dynamically.
      - Formatting the card number display.
- Ensure that **state updates only trigger necessary re-renders**.
- Optimize the **card flipping animation** to avoid unnecessary DOM updates.

### 📌 **Performance Optimization Techniques**
- **Optimize Card Rendering**
      - Wrap `CustomCard.js` with `React.memo()` to prevent re-renders when the card state hasn’t changed.
      - Use `useMemo()` to memoize:
            - The card **background color** calculation (`generateCardColors()`).
            - The **formatted number display**.

- **Optimize Event Handlers**
      - Wrap event handlers such as **card removal and flipping** inside `useCallback()` to avoid unnecessary re-creations.

- **Improve State Updates**
      - Ensure **only relevant components update** when new cards are added or removed.
      - Prevent **deep object mutations** that could trigger unnecessary re-renders.

### 📌 **Implementation**
- The **memoization and optimizations should be applied in**:
      - **📄 `src/components/CustomCard.js`** (Optimize rendering & event handlers).
      - **📄 `src/components/CardList.js`** (Avoid re-renders when the card list doesn’t change).
      - **📄 `src/utils/generateCardColors.js`** (Use `useMemo()` to optimize color generation).

---

# **✅ Expected Behavior**
- **Users can generate valid card numbers** dynamically using the **Luhn Algorithm**.
- **Users can select a card type (credit, debit, prepaid)** before generating a card.
- **Each card type must have a unique design**, including:
      - **Background color based on the card number**.
      - **Notch shape based on the card type**.
- **Cards must be flippable** with a **CSS animation**.
- **A cooldown timer must be enforced** to prevent rapid card generation.
- **The CVV must be generated dynamically from an API request**.
- **The expiration date must always be in the future**.
- **Users can store up to 10 cards**, using React Context API for state management.
- **Performance optimizations should minimize unnecessary re-renders**.

🚀 **Good luck!** 🚀

---

# 💫 Guides

A node version equal to or higher than 18 is required.

## Install project dependencies using npm:

You should be in the root directory and run the following command:
`npm install`

## Execute the project:

This will launch the application in your default web browser. If it does not open automatically, you can access the application at [http://localhost:3000](http://localhost:3000).

Run the following command:
`npm start`

---

# 📤 Submission

1. Solve the proposed tasks.
2. Continuously push the changes you have made.
3. Wait for the results.
4. Click **submit challenge** when you have reached your maximum score.

---

# 📊 Evaluation

The final score will be given according to whether or not the objectives have been met.

In this case, the challenge will be evaluated on **1800 points** (1400 task + 400 code quality) which are distributed as follows:

- **Task 1**: 100 points
- **Task 2**: 200 points
- **Task 3**: 200 points
- **Task 4**: 200 points
- **Task 5**: 100 points
- **Task 6**: 100 points
- **Task 7**: 100 points
- **Task 8**: 200 points
- **Task 9**: 100 points
- **Task 10**: 100 points
- **Code quality**: 400 points

---

# ❓ FAQs / Additional Information

In this case, as it is a more complex challenge, no tests are provided. But all the guidance needed to complete it is provided both within the README in tasks and within the code itself. Only the files proposed in the objectives should be modified. You are not allowed to modify anything other than the proposed files.

**Q1: What happens if I modify files that are not explicitly specified in the tasks?**

A1: The correction will fail because those changes will not be taken into account.

**Q2: Can I add resources that are not in package.json?**

A2: No, everything needed to complete the challenge is included.
