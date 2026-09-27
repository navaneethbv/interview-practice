## Intuition
For each cell, the desired product is the product before it times the product after it in a flattened traversal.
Two passes compute those prefix and suffix products without dividing, which works even when values are multiples of the modulus.

## Brute force
Multiplying every other cell for every output cell costs quadratic time in the number of cells.
Division is also unsafe when a factor is zero or not invertible modulo 12345.

## Approach

1. Flatten the matrix in row-major order.
2. In the forward pass, store the product of all earlier cells in each output position, reducing modulo 12345.
3. In the reverse pass, multiply each stored prefix by the product of all later cells.
4. Update the running suffix product after processing the current input cell.
5. The input grid remains unchanged.

## Walkthrough
For Example 1, `[2,3,4,5]` receives prefix values 1, 2, 6, and 24.
The reverse pass multiplies those by suffix values 60, 20, 5, and 1, producing `[[60,40],[30,24]]`.
For input 12345, its factor is zero modulo 12345, so every product that includes it becomes zero while the other cell's result remains 7.

## Complexity
With N total cells, the two passes take O(N) time.
The output matrix uses O(N) space, and the running product uses O(1) auxiliary space.

## Edge cases
A factor congruent to zero modulo 12345 is handled without division.
The row-major flattening maps every index back to its original row and column.

## Common mistakes
Do not include the current cell in either its prefix or suffix product.
Apply the modulus after each multiplication to control intermediate size.
Use the original grid during the reverse pass rather than the partially written output.

## Language notes
Python uses `divmod` to map flattened indices.
Java uses integer division and remainder for the same mapping with a wide running product.
