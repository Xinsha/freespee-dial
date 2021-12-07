class Dial {
    constructor(dialOutputTextElement) {
        this.dialOutputTextElement = dialOutputTextElement
        this.clear()
    }

    //Added another button to be able to clear the output at will
    clear() {
        this.dialOutput = ''
    }

    //Appends numbers and charaters 
    appendChar(char) {
        this.dialOutput = this.dialOutput.toString() + char.toString()
    }

    //Adds and calculates the numbers while ignoring '#' and '*'
    calculate() {
        var chars = this.dialOutput
        var sum = 0
        var formattedChars = chars.replace(/[#*]/gi, '').split('').reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        });

        while (formattedChars != 0) {
            sum += formattedChars % 1000
            formattedChars = parseInt(formattedChars / 1000)
        }
        this.dialOutput = sum
    }

    //Updates the output by setting the div to whatever is assigned to "this.dialOutput"
    updateOutput() {
        this.dialOutputTextElement.innerText = this.dialOutput
    }
}

//List of conts used to grab data from the HTML
const charBtns = document.querySelectorAll('[data-chars]')
const calcBtn = document.querySelector('[data-equals]')
const clearBtn = document.querySelector('[data-clear]')
const dialOutputTextElement = document.querySelector('[data-dial-output]')
const dial = new Dial(dialOutputTextElement)



//EventListeners for the buttons

//Loops through each time the buttons 1,2,3,4,5,6,7,8,9,*,0,# is clicked
//and updates the output by running the functions appendChar() and updateOutput()
charBtns.forEach(button => {
    button.addEventListener('click', () => {
        dial.appendChar(button.innerText)
        dial.updateOutput()
    })
})

//Runs the calculate() and updateOutput() functions each time clicked
calcBtn.addEventListener('click', button => {
    dial.calculate()
    dial.updateOutput()
})

//Runs the clear() and updateOutput() functions each time clicked
clearBtn.addEventListener('click', button => {
    dial.clear()
    dial.updateOutput()
})