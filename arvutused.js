"use strict";
class InchesToCm {
    calculate(inches) {
        return inches * 2.54;
    }
    inputUnit() {
        return "in";
    }
    outputUnit() {
        return "cm";
    }
}
class KphToMps {
    calculate(kph) {
        return kph / 3.6;
    }
    inputUnit() {
        return "km/h";
    }
    outputUnit() {
        return "m/s";
    }
}
class ResistanceToCurrent {
    constructor(voltage, resistance) {
        this.voltage = voltage;
        this.resistance = resistance;
    }
    calculate(x) {
        return this.voltage / this.resistance;
    }
    inputUnit() {
        return "V";
    }
    outputUnit() {
        return "A";
    }
}
class Figure {
    constructor(calculator, g) {
        this.calculator = calculator;
        this.g = g;
        this.draw();
    }
    draw() {
        this.g.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
        this.g.fillStyle = "black";
        const points = [];
        for (let i = 0; i <= 20; i += 2) {
            const x = 20 * i;
            const y = this.g.canvas.height - 40 * this.calculator.calculate(i);
            points.push({ x, y });
            this.g.fillRect(x, y, 5, 5);
            this.g.fillText(i.toString(), x, this.g.canvas.height - 5);
            this.g.fillText(this.calculator.calculate(i).toFixed(1), 5, y - 5);
        }
        this.g.fillText(this.calculator.inputUnit(), this.g.canvas.width - 30, this.g.canvas.height - 5);
        this.g.fillText(this.calculator.outputUnit(), 5, this.g.canvas.height - 40 * this.calculator.calculate(20) - 5);
        this.g.beginPath();
        this.g.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.g.lineTo(points[i].x, points[i].y);
        }
        this.g.strokeStyle = "blue";
        this.g.stroke();
    }
}
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const calculatorSelect = document.getElementById("calculatorSelect");
const inchesToCm = new InchesToCm();
const kphToMps = new KphToMps();
let resistanceToCurrent = null;
function updateFigure() {
    const selectedCalculator = calculatorSelect.value;
    if (selectedCalculator === "inchesToCm") {
        const figure = new Figure(inchesToCm, ctx);
    }
    else if (selectedCalculator === "kmToMps") {
        const figure = new Figure(kphToMps, ctx);
    }
    else if (selectedCalculator === "resistanceToCurrent") {
        const voltage = parseFloat(prompt("Enter voltage:"));
        const resistance = parseFloat(prompt("Enter resistance:"));
        resistanceToCurrent = new ResistanceToCurrent(voltage, resistance);
        if (!isNaN(voltage) && !isNaN(resistance)) {
            const figure = new Figure(resistanceToCurrent, ctx);
        }
        else {
            alert("Invalid input. Please enter valid numbers for voltage and resistance.");
        }
    }
}
calculatorSelect.addEventListener("change", updateFigure);
updateFigure();
