
        const btn1 = document.getElementById("btn1");
        const file1 = document.getElementById("file1");
        const output1 = document.getElementById("output1");
        const output2 = document.getElementById("output2");
        const op = document.getElementById("op");

        const optab = new Map([
            ['ADD', '18'], ['ADDF', '58'], ['ADDR', '90'], ['AND', '40'], ['CLEAR', 'B4'],
            ['COMP', '28'], ['COMPF', '88'], ['COMPR', 'A0'], ['DIV', '24'], ['DIVF', '64'],
            ['DIVR', '9C'], ['FIX', 'C4'], ['FLOAT', 'C0'], ['HIO', 'F4'], ['J', '3C'],
            ['JEQ', '30'], ['JGT', '34'], ['JLT', '38'], ['JSUB', '48'], ['LDA', '00'],
            ['LDB', '68'], ['LDCH', '50'], ['LDF', '70'], ['LDL', '08'], ['LDS', '6C'],
            ['LDT', '74'], ['LDX', '04'], ['LPS', 'D0'], ['MUL', '20'], ['MULF', '60'],
            ['MULR', '98'], ['NORM', 'C8'], ['OR', '44'], ['RD', 'D8'], ['RMO', 'AC'],
            ['RSUB', '4C'], ['SHIFTL', 'A4'], ['SHIFTR', 'A8'], ['SIO', 'F0'], ['SSK', 'EC'],
            ['STA', '0C'], ['STB', '78'], ['STCH', '54'], ['STF', '80'], ['STI', 'D4'],
            ['STL', '14'], ['STS', '7C'], ['STSW', 'E8'], ['STT', '84'], ['STX', '10'],
            ['SUB', '1C'], ['SUBF', '5C'], ['SUBR', '94'], ['SVC', 'B0'], ['TD', 'E0'],
            ['TIO', 'F8'], ['TIX', '2C'], ['TIXR', 'B8'], ['WD', 'DC'],
        ]);

        const symtab = new Map(); 
        let locctr = 0;
        let start = 0;

        // Upload File and Populate Assembly Code
        btn1.addEventListener("click", function () {
            const file = file1.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const text = e.target.result;
                    document.getElementById("pass1").value = text;

                    const code = document.getElementById("pass1").value;
                    op.value = '';
                    const lines = code.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        const parts = lines[i].trim().split(/\s+/);
                        try {
                            const opcode = parts[1];
                            if (optab.has(opcode)) {
                                op.value += `${opcode} ${optab.get(opcode)}\n`;
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    btn1.textContent = "Uploaded";
                    btn1.disabled = true;
                    btn1.style.backgroundColor = "#d3d3d3";
                    btn1.style.color = "#fff";
                    
                };
                reader.readAsText(file);
            }

            else {
                alert("Please upload the file");
            }
        });

        // Upload File for OPTAB
        const btn2 = document.getElementById("btn2");
        const file2 = document.getElementById("file2");
        btn2.addEventListener("click", function () {
            const file = file2.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const text = e.target.result;
                    op.value = text;
                    btn2.textContent = "Uploaded";
                    btn2.disabled = true;
                    btn2.style.backgroundColor = "#d3d3d3";
                    btn2.style.color = "#fff";
                };
                reader.readAsText(file);
            } else {
                alert("Please upload the file");
            }
        });

        // Clear Button for Assembly Code
        document.getElementById("clrsrc").addEventListener("click", function () {
            document.getElementById("pass1").value = "";
            btn1.textContent = "Upload src";
            btn1.disabled = false;
            btn1.style.backgroundColor = "#007bff";
            btn1.style.color = "#fff";
            clrsrc.textContent="Cleared";
            
        });

        // Clear Button for OPTAB
        document.getElementById("clrop").addEventListener("click", function () {
            op.value = "";
            btn2.textContent = "Upload op";
            btn2.disabled = false;
            btn2.style.backgroundColor = "#007bff";
            btn2.style.color = "#fff";
            clrop.textContent="Cleared";
            
        });

        // Clear Button for Intermediate File
        document.getElementById("clrout1").addEventListener("click", function () {
            output1.value = "";
            clrout1.textContent="Cleared";
        });

        // Clear Button for SYMTAB

        document.getElementById("clrsym").addEventListener("click", function () {
            document.getElementById("symtab").value = "";
            clrsym.textContent="Cleared";
        });

        // Clear Button for Output for Pass 2

        document.getElementById("clrout2").addEventListener("click", function () {
            output2.value = "";
            clrout2.textContent="Cleared";
        });

        // Save Button for Output for Pass 2

        document.getElementById("btnsave5").addEventListener("click", function () {
            const text = document.getElementById("output2").value;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "output_pass2.txt";
            a.click();
        });

        // Save Button for Intermediate File

        document.getElementById("btnsave3").addEventListener("click", function () {
            const text = document.getElementById("output1").value;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "intermediate_file.txt";
            a.click();
        });

        // Save Button for SYMTAB

        document.getElementById("btnsave4").addEventListener("click", function () {
            const text = document.getElementById("symtab").value;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "symtab.txt";
            a.click();
        });



        // Save Button for Assembly Code
        /*document.getElementById("btnsave1").addEventListener("click", function () {
            const text = document.getElementById("pass1").value;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "assembly_code.txt";
            a.click();
        });

        // Save Button for OPTAB
        document.getElementById("btnsave2").addEventListener("click", function () {
            const text = document.getElementById("op").value;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "optab.txt";
            a.click();
        });*/

        // save as local storage for assembly code using save button and display un till i clear it
        document.getElementById("btnsave1").addEventListener("click", function () {
            const text = document.getElementById("pass1").value;
            localStorage.setItem("assembly_code", text);
            windowonload = function () {
                const text = localStorage.getItem("assembly_code");
                document.getElementById("pass1").value = text;
                localStorage.setItem("assembly_code", text);

            }
            
        });

        window.onload = function () {
            const text = localStorage.getItem("assembly_code");
            document.getElementById("pass1").value = text;
        };

        //when i clear the text area it should clear the local storage

        document.getElementById("clrsrc").addEventListener("click", function () {
            document.getElementById("pass1").value = "";
            localStorage.removeItem("assembly_code");
        });

        // save as local storage for optab using save button
        document.getElementById("btnsave2").addEventListener("click", function () {
            const text = document.getElementById("op").value;
            localStorage.setItem("optab", text);

        });
        
        window.addEventListener("load", function () {
            const text = localStorage.getItem("optab");
            document.getElementById("op").value = text;
        });
        
       
        // Pass One function to process all lines
        function passOne() {
            const code = document.getElementById("pass1").value;


            const inputArr = code.split('\n');
            for (let i = 0; i < inputArr.length; i++) {
                inputArr[i] = inputArr[i].trim().split(/\s+/);
            }

            const optabArr = op.value.trim().split('\n').map(line => line.trim().split(/\s+/));

            const out = pass1(inputArr, optabArr);
            output1.value = out.intermediate;

            const symtab = out.symtab;
            document.getElementById("symtab").value = symtab;

        }

        // Event listener for Pass One button
        document.getElementById("btnp1").addEventListener("click", passOne);

        //if i click btnp1 then div bndry1 displayed  and for btnp2 bndry2  displayed else hide should be else 

        function pass1(inputArr, optabArr) {
            let locctr = 0, i = 1, prev, top = 0, pos = -1
            let interAddr = []
            const symtabArr = [[]]
            let opcode
            let intermediate = "", symtab = ""
            if (inputArr[0][1] === 'START') {
                locctr = parseInt(inputArr[0][2], 16)
                prev = locctr
            } else {
                locctr = 0
            }

            while (inputArr[i][1] !== 'END') {
                let found = false
                opcode = inputArr[i][1]
                for (let x = 0; x < optabArr.length; x++) {
                    if (optabArr[x][0] === opcode) {
                        locctr += 3
                        // console.log(opcode + " is there")
                        found = true
                        break
                    }
                }
                if (!found) {
                    if (inputArr[i][1] === 'WORD') {
                        locctr += 3
                    }
                    else if (inputArr[i][1] === 'RESW') {
                        locctr += 3 * parseInt(inputArr[i][2])

                    }
                    else if (inputArr[i][1] === 'RESB') {
                        locctr += parseInt(inputArr[i][2])

                    }
                    else if (inputArr[i][1] === 'BYTE') {
                        const len = inputArr[i][2].length
                        locctr += len - 3

                    }
                    else {
                        console.log("Invalid opcode")
                    }
                }
                top++
                interAddr[top] = prev.toString(16)
                i++
                prev = locctr

                //symtab
                if (inputArr[i][0] !== '-') {
                    // console.log(inputArr[i][0] + " ondd")
                    let flag = 0
                    for (let x = 0; x < symtabArr.length; x++) {
                        if (symtabArr[x][0] === inputArr[i][0]) {
                            flag = 1
                            symtabArr[x][2] = 1
                        }
                    }
                    pos++
                    symtabArr[pos] = ([inputArr[i][0], prev.toString(16), flag])
                }
            }
            top++
            interAddr[top] = prev.toString(16)

            intermediate = "-\t" + inputArr[0][0] + "\t" + inputArr[0][1] + "\t" + inputArr[0][2] + "\n"
            for (let j = 1; j < interAddr.length; j++) {
                intermediate += interAddr[j] + "\t" + inputArr[j][0] + "\t" + inputArr[j][1] + "\t" + inputArr[j][2] + "\n"
            }
            intermediate = intermediate.slice(0, -1)

            for (let j = 0; j < symtabArr.length; j++) {
                symtab += symtabArr[j][0] + "\t" + symtabArr[j][1] + "\t" + symtabArr[j][2] + "\n"
            }
            symtab = symtab.slice(0, -1)

            return { intermediate, symtab }
        }

        function pass2(optabArr, intermediateArr, symtabArr) {
            let i = 1, objectCode
            let objectCodeArr = []

            while (intermediateArr[i][2] !== 'END') {
                console.log(intermediateArr[i][2])
                let found = false
                optabArr.forEach((opLine) => {
                    if (opLine[0] === intermediateArr[i][2]) {
                        found = true
                        objectCode = opLine[1]
                        symtabArr.forEach((symLine) => {
                            if (symLine[0] === intermediateArr[i][3]) {
                                objectCode += symLine[1]
                                objectCodeArr.push(objectCode)
                            }
                        })
                    }
                })

                if (!found) {
                    if (intermediateArr[i][2] === 'WORD') {
                        const val = parseInt(intermediateArr[i][3])
                        objectCode = val.toString(16).padStart(6, '0')
                        objectCodeArr.push(objectCode)
                    }
                    else if (intermediateArr[i][2] === 'BYTE') {
                        const val = intermediateArr[i][3].substring(2, intermediateArr[i][3].length - 1)
                        objectCode = ""
                        for (let char of val) {
                            objectCode += char.charCodeAt(0).toString(16)
                        }
                        objectCodeArr.push(objectCode)
                    }
                    else if (intermediateArr[i][2] === 'RESW' || intermediateArr[i][2] === 'RESB') {
                        objectCode = "\t"
                        objectCodeArr.push(objectCode)
                    }
                }
                i++
            }
            objectCodeArr.push("\t")

            let output = intermediateArr[0][0] + "\t" + intermediateArr[0][1] + "\t" + intermediateArr[0][2] + "\t" + intermediateArr[0][3] + "\n"
            // console.log(intermediateArr.length)
            for (let j = 1; j < intermediateArr.length; j++) {
                output += intermediateArr[j][0] + "\t" + intermediateArr[j][1] + "\t" + intermediateArr[j][2] + "\t" + intermediateArr[j][3] + "\t" + objectCodeArr[j - 1] + "\n"
            }
            const lower = parseInt(intermediateArr[1][0], 16)
            const upper = parseInt(intermediateArr[intermediateArr.length - 1][0], 16)
            const length = upper - lower
            let output2 = "H^" + intermediateArr[0][1].padEnd(6, "_") + "^" + intermediateArr[1][0] + "^" + length.toString(16).padStart(6, "0") + "\n\n"
            let lines = intermediateArr.length - 1, x = 1, text = "", size = 0, keri = false
            // console.log(objectCodeArr)
            let start = intermediateArr[x][0]
            while (x < intermediateArr.length) {
                keri = false
                if (objectCodeArr[x - 1] === "\t") {
                    x++
                    continue
                }
                text += "^" + objectCodeArr[x - 1]
                try {
                    size += objectCodeArr[x - 1].length / 2
                } catch (e) {
                    console.log(e)
                }
                if (size > 21) {
                    keri = true
                    size -= objectCodeArr[x - 1].length / 2
                    text = text.slice(0, -objectCodeArr[x - 1].length - 1)
                    output2 += "T^" + start + "^" + size.toString(16).padStart(2, "0") + text + "\n"
                    start = intermediateArr[x][0]
                    text = ""
                    size = 0
                    continue
                }
                x++
            }
            if (!keri) {
                output2 += "T^" + start + "^" + size.toString(16).padStart(2, "0") + text + "\n\n"
            }

            output2 += "E^" + intermediateArr[1][0]
            // console.log(output2)

            symtabArr.forEach((symLine) => {
                if (symLine[2] == 1) {
                    output = "AUGEYSTOOOO"
                    output2 = "AUGEYSTOOOO"
                }
            })

            return { output, output2 }
        }

        // Pass Two function
        function passTwo() {
            const intermediateCode = output1.value.trim(); // Use the intermediate code from Pass 1
            const lines = intermediateCode.split("\n");
            const symt = document.getElementById("symtab").value.trim();
            const opt = document.getElementById("op").value.trim();

            const symtabArr = symt.split("\n").map(line => line.trim().split(/\s+/));
            const intermediateArr = lines.map(line => line.trim().split(/\s+/));
            const optabArr = opt.split("\n").map(line => line.trim().split(/\s+/));

            // for all aarays if len is 2 then add 2nd element as 0
            for (let i = 0; i < intermediateArr.length; i++) {
                if (intermediateArr[i].length === 2) {
                    intermediateArr[i].push('0')
                }
            }

            const a = pass2(optabArr, intermediateArr, symtabArr)
            output2.value = a.output2
        }

        // Event listener for Pass Two button
        document.getElementById("btnp2").addEventListener("click", passTwo);

       document.getElementById("btnp1").addEventListener('click', function() {
        showDiv('bndry2');
    });
    
    document.getElementById("btnp2").addEventListener('click', function() {
        showDiv('bndry3');
    });
    
    function showDiv(className) {
       
        document.querySelectorAll('.bndry').forEach(function(div) {
            div.style.display = 'none';
        });
        
        
        document.querySelector('.' + className).style.display = 'block';
    }
    
