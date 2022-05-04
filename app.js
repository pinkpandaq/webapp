//main application
//categories 3-4
//shows how much balance left to spend #add date. #able to edit and remove the entries.
///takes income #positive. #color code.
///minus expenses #negative.
///minus savings maybe? #negative
///shows a bar chart or pie chart #need a legend for the chart.


//howto
//screenshots of images
//text displaying how to use the file
//bo back button



let ExpenseController = (() => {
    let total = 0, income = 0, expenses = 0, savings = 0;

    return {
        inputEntry(userInput) {
            if (userInput['expenseType'] === 'income') {
                income += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'saving') {
                savings += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'expense') {
                expenses += userInput['value'];
                total -= userInput['value'];
            }
        },


        getDataIncome() {
            return income;
        },

        getDataExpenses() {
            return expenses;
        },

        getDataSaving() {
            return savings;
        },

        getDataTotal() {
            return total;
        }
    }

})();

let UIController = (() => {
    let expenseType = 'income';

    let HTMLStrings = {
        inExpDesc: '.input-expense-description', inExpVal: '.input-expense-value', buttonSubmitExpense: '.submitButtonRadius', expList: '.expListType', currentMonth: '#current-month',
        typeExp: '#type-expense', typeIncome: '#type-income', typeSaving: '#type-savings', trackingText: '.tracking-text', expenseChart: '#marginChart', monthBudget: '#month-budget'
    };

    return {
        numberFormat(number) {
            return Intl.NumberFormat('en-IN').format(number);
        },
        showCurrentMonth() {
            let now, tday, month, year, months;

            now = new Date();
            tday = now.getDay();
            month = now.getMonth();
            year = now.getFullYear();
            months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            document.querySelector(HTMLStrings.currentMonth).textContent = months[month] + " " +tday+", "+ year;
        },

        getHTMLStrings() {
            return HTMLStrings;
        },

        setExpenseType(type) {
            console.log('here', type);
            this.expenseType = type;
            let emoji ="💰";
            if (type === 'income') {
                emoji ="💰";
                if (document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-warning')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.remove('btn-warning');
                }
                if (document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-danger')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.remove('btn-danger');
                }
                if (!document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-success')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.add('btn-success');
                }
            }

            if (type === 'expense') {
                emoji = "🧾";
                if (document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-warning')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.remove('btn-warning');
                }
                if (document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-success')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.remove('btn-success');
                }
                if (!document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-danger')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.add('btn-danger');
                }
            }
            if (type === 'saving') {
                emoji = "🏠";
                if (document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-danger')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.remove('btn-danger');
                }
                if (document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-success')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.remove('btn-success');
                }
                if (!document.querySelector(HTMLStrings.buttonSubmitExpense).classList.contains('btn-warning')) {
                    document.querySelector(HTMLStrings.buttonSubmitExpense).classList.add('btn-warning');
                }
            }

            document.querySelector(HTMLStrings.trackingText).textContent = "Enter your " + type + " " + emoji + " below";

        },

        getUserExpenseInput() {
            return {
                description: document.querySelector(HTMLStrings.inExpDesc).value,
                value: parseInt(document.querySelector(HTMLStrings.inExpVal).value),
                date: new Date().toLocaleDateString(),
                expenseType: this.expenseType ? this.expenseType : 'income'
            }
        },

        addListItem (inputObj) {
            let html, element;
            element = HTMLStrings.expList;

            if (inputObj['expenseType'] === 'income') {
                html = '<div class="bottom-border"> <div class="row paddingExp"><div class="col-2 expDateTextColor font15">' + inputObj['date'] + ' </div><div class="col-8 expDateText fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 ValExp expense-income fs-15"> $ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            } else if (inputObj['expenseType'] === 'expense') {
                html = '<div class="bottom-border"> <div class="row paddingExp"><div class="col-2 expDateTextColor font15">' + inputObj['date'] + ' </div><div class="col-8 expDateText fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 ValExp RedExp fs-15"> $ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            } else if (inputObj['expenseType'] === 'saving') {
                html = '<div class="bottom-border"> <div class="row paddingExp"><div class="col-2 expDateTextColor font15">' + inputObj['date'] + ' </div><div class="col-8 expDateText fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 ValExp GreenExp fs-15"> $ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            }

            // Add the new element
            document.querySelector(element).insertAdjacentHTML('beforeend', html);

            // Clear the input fields after adding element
            document.querySelector(HTMLStrings.inExpVal).value = "";
            document.querySelector(HTMLStrings.inExpDesc).value = "";
        },

        updateOverallTotal(totalValue) {
            document.querySelector(HTMLStrings.monthBudget).textContent  = "$ " + this.numberFormat(totalValue);

            if (totalValue > 0) {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('RedExp')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('RedExp');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('expense-income');
            } else {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-income')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-income');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('RedExp');
            }
        },

        displayChart(income = 0, expenses = 0, savings = 0) {
            let ctx = document.querySelector(HTMLStrings.expenseChart);
            let expenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Income', 'Expenses', 'Savings'],
                    datasets: [{
                        data: [income, expenses, savings],
                        backgroundColor: [
                            'rgba(32, 137, 56, 1)',
                            'rgba(255, 84, 98, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                }
            });
        }
    }
})();

((UIController, ExpenseController) => {

    let HTMLStrings = UIController.getHTMLStrings();
    let setupEventListeners = () => {
        document.querySelector(HTMLStrings.buttonSubmitExpense).addEventListener('click', addExpense);
        document.querySelector(HTMLStrings.typeExp).addEventListener('click', () => {
            setExpenseType('expense')
        });
        document.querySelector(HTMLStrings.typeSaving).addEventListener('click', () => {
            setExpenseType('saving')
        });
        document.querySelector(HTMLStrings.typeIncome).addEventListener('click', () => {
            setExpenseType('income')
        });
    };

    let setExpenseType = (type) => {
        UIController.setExpenseType(type);
    }

    let addExpense = () => {
        let input = UIController.getUserExpenseInput();
        console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            console.log('Adding item');
            UIController.addListItem(input);
            ExpenseController.inputEntry(input);
            UIController.updateOverallTotal(ExpenseController.getDataTotal());
            UIController.displayChart(ExpenseController.getDataIncome(), ExpenseController.getDataExpenses(),
                ExpenseController.getDataSaving());
        }
    }

    let init = () => {
        console.log('Initializing...');
        setupEventListeners();
        UIController.showCurrentMonth();
    }

    init();

})(UIController, ExpenseController);