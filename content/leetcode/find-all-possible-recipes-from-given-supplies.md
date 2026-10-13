# Find All Possible Recipes From Given Supplies

You have an unlimited amount of every ingredient named in `supplies`.
Recipe `recipes[i]` requires every name in `ingredients[i]`. A required name may be a raw ingredient or another recipe. Once you can prepare a recipe, it becomes available in unlimited quantity for other recipes.

Return the names of all recipes you can eventually prepare, in any order. A dependency cycle cannot supply its own starting ingredients.

## Examples

### Example 1

```text
Input: recipes = ["dough", "pizza"], ingredients = [["flour", "water"], ["dough", "tomato"]], supplies = ["flour", "water", "tomato"]
Output: ["dough", "pizza"]
Explanation: The available raw ingredients make dough, which unlocks pizza.
```

### Example 2

```text
Input: recipes = ["sauce", "stew"], ingredients = [["stew"], ["sauce", "salt"]], supplies = ["salt"]
Output: []
Explanation: Neither recipe can be the first to complete.
```

## Constraints

- `1 <= recipes.length <= 100`; `ingredients.length == recipes.length`.
- `1 <= ingredients[i].length <= 100`; each ingredient list contains distinct names.
- `1 <= supplies.length <= 100`.
- Names contain 1 to 10 lowercase English letters.
- Recipe names are unique, supply names are unique, and no recipe name is initially a supply.

## Approach

Count each recipe's unresolved ingredients and index the recipes waiting for each name. Start a queue with the supplies. Each available name reduces the counts of its dependents; a recipe reaching zero joins the queue. Missing raw ingredients and cycles remain unresolved.

With `E` total ingredient references, `R` recipes and `S` supplies, this takes `O(E + R + S)` time and space.
