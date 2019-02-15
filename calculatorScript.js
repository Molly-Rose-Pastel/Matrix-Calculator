/**
 * @file calculatorScript.js
 * @brief contains JavaScript functions for the Matrix Calculator
 * @author Patrick Wagner
 * @date 05.09.2018
 * 
 * 
 */

/**
 * @function generateEmptyMatrix(side, rows, columns)
 * @brief Generates a string with HTML Code for an input matrix with with
 *        specified rows and columns
 * @param side
 *            "a" for Matrix A, "b" for Matrix B
 * @param rows
 *            number of rows
 * @param columns
 *            number of columns
 * 
 * @return nothing
 */
function generateEmptyMatrix(side, rows, columns) {
	if (side == 'c') {
		var matrix = "";
		// iterate rows
		for (var r = 1; r < rows + 1; r++) {
			// iterate columns
			for (var c = 1; c < columns + 1; c++) {
				// create empty result matrix
				matrix += "<input type = number id=" + side + ":" + r + ";" + c
						+ " readonly>";
			}
			matrix += "<br>"
		}
		document.getElementById(side).innerHTML = matrix;
	}

	else {
		var matrix = "";
		// iterate rows
		for (var r = 1; r < rows + 1; r++) {
			// iterate columns
			for (var c = 1; c < columns + 1; c++) {
				// create empty input matrix
				matrix += "<input type = number id=" + side + ":" + r + ";" + c
						+ " oninput = autoFillZero(\'" + side + "\'," + r + ","
						+ c + ") maxlength = 6>";
			}
			matrix += "<br>";
		}
		document.getElementById(side).innerHTML = matrix;
	}
}

/**
 * @function sumMatrix(operator)
 * @brief adds or subtracts matrix A and matrix B.
 * @param operator
 *            'add' for addition, 'sub' for subtraction
 * @return none
 */
function sumMatrix(operator) {

	// check if operation is valid
	if (isMatrixValid("square") != true) {
		alert("Matrices have to be the same size!")
	} else {

		// store matrix size in local variables
		var rows = getMatrixFillSize("a", "rows");
		var columns = getMatrixFillSize("a", "columns");

		// create local variables for calculations
		var leftOperand, rightOperand, result;

		// generate empty result matrix
		generateEmptyMatrix('c', rows, columns);

		// iterate rows
		for (var r = 1; r < rows + 1; r++) {

			// iterate columns
			for (var c = 1; c < columns + 1; c++) {

				// store values in local variables
				leftOperand = parseFloat(document.getElementById("a:" + r + ";"
						+ c).value, 10);
				rightOperand = parseFloat(document.getElementById("b:" + r
						+ ";" + c).value, 10);

				// determine which operation to do
				if (operator == "add") {
					result = leftOperand + rightOperand;
				}
				if (operator == "sub") {
					result = leftOperand - rightOperand;
				}

				// write calculated value into result matrix
				document.getElementById("c:" + r + ";" + c).value = parseFloat(
						result, 10);
			}
		}
	}
}

/**
 * @function multiplyMatrix()
 * @brief multiplies Matrix A with Matrix B. Columns of Matrix A have to be as
 *        many as rows of Matrix B.
 * @param none
 * @return none
 */
function multiplyMatrix() {

	// check if multiplication is possible
	if (isMatrixValid("multiply") != true) {
		alert("Matrix A needs to have as many columns as Matrix B has rows")
		return;
	}

	else {
		// store matrix dimensions in local variables
		var rowsA = getMatrixFillSize("a", "rows");
		var rowsB = getMatrixFillSize("b", "rows");
		var columnsB = getMatrixFillSize("b", "columns");

		// create local variables for calculations
		var multi, add = 0, matA, matB;

		// generate empty result Matrix
		generateEmptyMatrix("c", rowsA, columnsB);

		// loop to iterate rows of Matrix A
		for (var k = 1; k < rowsA + 1; k++) {

			// loop to iterate columns of Matrix B
			for (var j = 1; j < columnsB + 1; j++) {

				// loop to iterate rows of Matrix B
				for (var i = 1; i < rowsB + 1; i++) {

					// store value of Matrix Element as float value in variable
					matA = parseFloat(document.getElementById("a:" + k + ";"
							+ i + "").value, 10);

					// store value of Matrix Element as float value in variable
					matB = parseFloat(document.getElementById("b:" + i + ";"
							+ j + "").value, 10);

					// multiply both values and store in variable
					multi = matA * matB;

					// add multiplied values up
					add += multi;
				}

				// put calculation result into result matrix
				document.getElementById("c:" + k + ";" + j).value = add;

				// reset add variable
				add = 0;
			}
		}
	}
}

/**
 * @function getMatrixSize(matrix,coordinate)
 * @brief returns the number of rows or columns of specified matrix.
 * @param matrix
 *            "a", "b", "c"
 * @param coordinate
 *            "rows", "columns"
 * @return number of rows or columns
 */
function getMatrixSize(matrix, coordinate) {
	var r = 1, c = 1;

	switch (matrix) {
	case "a":

		switch (coordinate) {
		case "columns":
			var columnsLeft = 0;
			while (document.getElementById("a:1;" + c)) {
				c++;
				columnsLeft++;
			}
			return columnsLeft;
		case "rows":
			var rowsLeft = 0;
			while (document.getElementById("a:" + r + ";1")) {
				r++;
				rowsLeft++;
			}
			return rowsLeft;
			break;
		default:
			break;
		}
		break;

	case "b":

		switch (coordinate) {
		case "columns":
			var columnsRight = 0;
			while (document.getElementById("b:1;" + c)) {
				c++;
				columnsRight++;
			}
			return columnsRight;
		case "rows":
			var rowsRight = 0;
			while (document.getElementById("b:" + r + ";1")) {
				r++;
				rowsRight++;
			}
			return rowsRight;
			break;
		default:
			break;
		}
		break;

	case "c":

		switch (coordinate) {
		case "columns":
			var columnsResult = 0;
			while (document.getElementById("c:1;" + c)) {
				c++;
				columnsResult++;
			}
			return columnsResult;
		case "rows":
			var rowsResult = 0;
			while (document.getElementById("c:" + r + ";1")) {
				r++;
				rowsResult++;
			}
			return rowsResult;
			break;
		default:
			break;
		}
		break;
	default:
		break;
	}
}

/**
 * @function getMatrixFillSize(matrix, coordinate)
 * @brief returns the number of filled in rows or columns of specified matrix.
 *        NOTE: the parameters have to be put into quotation marks, to transfer
 *        them as strings.
 * @param matrix
 *            "a" for Matrix A, "a" for Matrix B, "matC" for result Matrix
 * @param coordinate
 *            "columns" for columns, "rows" for rows
 * @return the number of filled in rows or columns
 */
function getMatrixFillSize(matrix, coordinate) {
	switch (matrix) {
	case "a":

		switch (coordinate) {
		case "columns":
			var columnsLeft = 0;
			var c = 1;
			while (document.getElementById("a:1;" + c)
					&& isNaN(parseFloat(document.getElementById("a:1;" + c).value)) != true) {
				c++;
				columnsLeft++;
			}
			return columnsLeft;
			break;

		case "rows":
			var rowsLeft = 0;
			var r = 1;
			while (document.getElementById("a:" + r + ";1")
					&& isNaN(parseFloat(document
							.getElementById("a:" + r + ";1").value)) != true) {
				r++;
				rowsLeft++;
			}
			return rowsLeft;
			break;
		default:
			break;
		}

	case "b":

		switch (coordinate) {
		case "columns":
			var columnsRight = 0;
			var c = 1;
			while (document.getElementById("b:1;" + c)
					&& isNaN(parseFloat(document.getElementById("b:1;" + c).value)) != true) {
				c++;
				columnsRight++;
			}
			return columnsRight;
			break;

		case "rows":
			var rowsRight = 0;
			var r = 1;
			while (document.getElementById("b:" + r + ";1")
					&& isNaN(parseFloat(document
							.getElementById("b:" + r + ";1").value)) != true) {
				r++;
				rowsRight++;
			}
			return rowsRight;
			break;
		default:
			break;
		}

	case "c":

		switch (coordinate) {
		case "columns":
			var columnsResult = 0;
			var c = 1;
			while (document.getElementById("c:1;" + c)
					&& isNaN(parseFloat(document.getElementById("c:1;" + c).value)) != true) {
				c++;
				columnsResult++;
			}
			return columnsResult;
			break;

		case "rows":
			var rowsResult = 0;
			var r = 1;
			while (document.getElementById("c:" + r + ";1")
					&& isNaN(parseFloat(document
							.getElementById("c:" + r + ";1").value)) != true) {
				r++;
				rowsResult++;
			}
			return rowsResult;
			break;
		default:
			break;
		}
		break;
	default:
		break;
	}
}

/**
 * @function isMatrixValid()
 * @brief checks if input matrices are eligible for calculation
 * @param operation
 *            "square" to check if matrices are of the same size, "multiply" to
 *            check if matrices can be multiplied
 * @return true if yes, false if not
 */
function isMatrixValid(operation) {
	switch (operation) {
	case "square":
		if (getMatrixFillSize("a", "rows") == getMatrixFillSize("b", "rows")
				&& getMatrixFillSize("a", "columns") == getMatrixFillSize("b",
						"columns")) {
			return true;
		} else {
			return false;
		}
		break;

	case "multiply":
		if (getMatrixFillSize("a", "columns") == getMatrixFillSize("b", "rows")) {
			return true;
		} else {
			return false;
		}
		break;
	default:
		break;
	}
}

/**
 * @function autoFillZero(side,row,column)
 * @brief automatically fills matrix elements with 0 if the user enters an
 *        element without entering previous elements. These not-filled elements
 *        are filled in with 0. Needs to be called every time an element gets
 *        filled in and check previous elements. Fill-in logic is from left to
 *        right and top to bottom.
 * @param side
 *            "a" for Matrix A, "b" for Matrix B
 * @param row
 *            the row of the Element
 * @param column
 *            the column of the Element
 * @return nothing
 */
function autoFillZero(side, row, column) {

	// iterate rows
	for (var r = 1; r < row + 1; r++) {

		// iterate columns
		for (var c = 1; c < column + 1; c++) {

			// check if Element is empty (=NotaNumber)
			if (isNaN(parseFloat(document.getElementById(side + ":" + r + ";"
					+ c).value, 10)) == true) {

				// write a 0 in it
				document.getElementById(side + ":" + r + ";" + c).value = 0;
			}
		}
	}
}

/**
 * @function insertResult(matrix)
 * @brief inserts result Matrix into specified Matrix, effectively overwriting
 *        it
 * @param matrix
 *            "a" for matrix A, "b" for matrix B
 * @return nothing
 */
function insertResult(matrix) {

	// store rows and columns in local variables
	var rowsC = getMatrixFillSize("c", "rows");
	var columnsC = getMatrixFillSize("c", "columns");

	// overwrite input matrix with empty matrix of the size of the result matrix
	generateEmptyMatrix(matrix, rowsC, columnsC);

	// iterate rows
	for (var r = 1; r < rowsC + 1; r++) {

		// iterate columns
		for (var c = 1; c < columnsC + 1; c++) {

			// change value of input matrix element to value of result matrix
			// element
			document.getElementById(matrix + ":" + r + ";" + c + "").value = document
					.getElementById("c:" + r + ";" + c + "").value
		}
	}
}

/**
 * @function swapMatrix()
 * @brief swaps Matrix A with Matrix B if they are of the same fill-size
 * @param none
 * @return none
 */
function swapMatrix() {
	if (isMatrixValid("square") != true) {
		alert("Matrices need to be of the same size!");
		return;
	} else {

		// store rows and columns in local variables
		var rowsA = getMatrixFillSize("a", "rows");
		var columnsA = getMatrixFillSize("a", "columns");

		// create array to store values
		var buffer = new Array(rowsA * columnsA);

		// create array index
		var i = 0;

		// iterate rows
		for (var r = 1; r < rowsA + 1; r++) {
			// iterate columns
			for (var c = 1; c < columnsA + 1; c++) {
				// store values of Matrix Elements in array
				buffer[i++] = parseFloat(document.getElementById("a:" + r + ";"
						+ c).value);
			}
		}

		// reset array index
		i = 0;

		// write values of Matrix B's Elements into Matrix A's Elements
		// iterate rows
		for (var r = 1; r < rowsA + 1; r++) {
			// iterate columns
			for (var c = 1; c < columnsA + 1; c++) {
				// store values of Matrix Elements in array
				document.getElementById("a:" + r + ";" + c).value = document
						.getElementById("b:" + r + ";" + c).value
			}
		}

		// write values stored in buffer into Matrix B's Elements
		for (var r = 1; r < rowsA + 1; r++) {
			// iterate columns
			for (var c = 1; c < columnsA + 1; c++) {
				// store values of Matrix Elements in array
				document.getElementById("b:" + r + ";" + c).value = buffer[i++];
			}
		}
	}
}

/**
 * @function increaseMatrix(matrix)
 * @brief creates a new Matrix that is 1 dimension bigger than before and
 *        transfers previous values into new matrix
 * @param matrix
 *            "a" for Matrix A, "b" for Matrix B
 * @return none
 * 
 */
function increaseMatrix(matrix) {
	// get filled-in rows and columns
	var rows = getMatrixFillSize(matrix, "rows");
	var columns = getMatrixFillSize(matrix, "columns");

	// create buffer Array to store matrix values in
	var buffer = new Array(rows * columns);

	// create buffer index
	var i = 0;

	// iterate rows
	for (var r = 1; r < rows + 1; r++) {
		// iterate columns
		for (var c = 1; c < columns + 1; c++) {
			// save values in buffer
			buffer[i++] = document.getElementById(matrix + ":" + r + ";" + c).value;
		}
	}

	// generate new Matrix that is 1 dimension bigger than before
	generateEmptyMatrix(matrix, getMatrixSize(matrix, "rows") + 1,
			getMatrixSize(matrix, "columns") + 1);

	// reset buffer index
	i = 0;

	// iterate rows
	for (var r = 1; r < rows + 1; r++) {
		// iterate columns
		for (var c = 1; c < columns + 1; c++) {
			// copy saved values into new Matrix
			document.getElementById(matrix + ":" + r + ";" + c).value = buffer[i++];
		}
	}
}

/**
 * @function decreaseMatrix(matrix)
 * @brief decreases matrix by one dimension and keeps values if decreased matrix
 *        supports them
 * @para matrix "a", "b"
 * @return none
 */
function decreaseMatrix(matrix) {

	// first get matrix filled-in dimensions for support check
	var rows = getMatrixFillSize(matrix, "rows");
	var columns = getMatrixFillSize(matrix, "columns");

	// check for supportability
	if (rows <= getMatrixSize(matrix, "rows") - 1
			&& columns <= getMatrixSize(matrix, "columns")) {

		// store values in array
		buffer = new Array(rows * columns);

		// create array index
		var i = 0;

		// iterate rows
		for (var r = 1; r < rows + 1; r++) {

			// iterate columns
			for (var c = 1; c < columns + 1; c++) {
				buffer[i++] = parseFloat(document.getElementById(matrix + ":"
						+ r + ";" + c).value)
			}
		}

		// reset array index
		i = 0;

		// create new smaller input Matrix
		generateEmptyMatrix(matrix, getMatrixSize(matrix, "rows") - 1,
				getMatrixSize(matrix, "columns") - 1);

		// iterate rows
		for (var r = 1; r < rows + 1; r++) {

			// iterate columns
			for (var c = 1; c < columns + 1; c++) {

				// copy values from array to new matrix
				document.getElementById(matrix + ":" + r + ";" + c).value = buffer[i++];
			}
		}
	} else {

		// create new smaller input Matrix
		generateEmptyMatrix(matrix, getMatrixSize(matrix, "rows") - 1,
				getMatrixSize(matrix, "columns") - 1);
	}
}
