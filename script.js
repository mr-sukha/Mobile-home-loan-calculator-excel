function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) * 12;

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
        alert("Please enter valid values for all fields.");
        return;
    }

    const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow((1 + interestRate), -loanTerm));
    document.getElementById('monthlyPayment').innerText = "$" + monthlyPayment.toFixed(2);

    return {
        loanAmount,
        interestRate: (interestRate * 12 * 100).toFixed(2),
        loanTerm: loanTerm / 12,
        monthlyPayment: monthlyPayment.toFixed(2)
    };
}

function downloadExcel() {
    const loanData = calculateLoan();
    if (!loanData) return;

    const csvContent = `Loan Amount,Interest Rate,Loan Term (Years),Monthly Payment\n${loanData.loanAmount},${loanData.interestRate},${loanData.loanTerm},${loanData.monthlyPayment}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "HomeLoanCalculator.csv";
    a.click();
    URL.revokeObjectURL(url);
}

const article = `
This Home Loan Calculator helps you find out your monthly payment. With this calculator, you can also download the results in Excel format for easy record-keeping.

**Steps to Use the Calculator:**

1. **Enter Loan Amount**: 
   This is the total amount you need to borrow, entered in dollars. For example, enter "250000" for a $250,000 loan.

2. **Enter Interest Rate**:
   This is the annual interest rate for the loan. Enter it as a percentage (e.g., 5 for 5% interest). The calculator uses this rate to calculate your monthly interest payments.

3. **Enter Loan Term (Years)**: 
   Specify how many years you plan to repay the loan. For instance, if the loan term is 30 years, enter "30".

4. **Calculate the Payment**:
   After entering all values, click the "Calculate" button. The estimated monthly payment will appear below. This payment amount helps you understand the monthly financial commitment.

5. **Download as Excel**:
   You can save the results as an Excel file for future reference. Click "Download as Excel" to download the file. It will contain your loan amount, interest rate, loan term, and monthly payment. This is useful if you want to compare different loan scenarios or share the details with a financial advisor.

### Example

For example, suppose you want to borrow $300,000 at a 4.5% interest rate over 30 years. Enter 300000 for Loan Amount, 4.5 for Interest Rate, and 30 for Loan Term. Click "Calculate" to see the monthly payment, which you can download.

Using this calculator gives you a quick way to estimate your payments and manage your finances better.
`;
document.getElementById('article').innerText = article;

