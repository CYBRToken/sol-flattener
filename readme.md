# Solidity Flattener

This command-line utility flattens and/or merges Solidity files.


## Getting Started

```npm
sudo npm install -g sol-flattener
```

**CLI Arguments**

1. Path to the source file.
2. Path to generate the flattened file to.
3. Search paths.
4. Remove redundant empty lines. Default: false.


**How to Use sol-flattener?**

On your project root, run the following command.

```npm
sol-flattener ./contracts/Token.sol ./flattened/Token.sol .,../node_modules
```


## Configuration File

Alternatively, you can create `sol-flattener.json` configuration file in your project root.

```json
{
  "source": "../vesting-schedule/contracts/VestingSchedule.sol",
  "destination": "../vesting-schedule/flattened/VestingSchedule.sol",
  "search": "./,../node_modules",
  "removeRedundantEmptyLines": true
}
```

and then call `sol-flattener` instead of passing any command line argument.
