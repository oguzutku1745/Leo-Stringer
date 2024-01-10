# Leo Stringer

Leo Stringer is a helper library designed to handle strings within the Leo ecosystem, significantly enhancing its functionality. This library is capable of converting any given string to a bigint and vice versa, enabling seamless data processing and storage in the Aleo ecosystem.

As a frontend library, it enables direct string manipulation from any frontend interface.

## Installation

Install Leo Stringer with npm:

```bash
npm install leostringer
```

## Usage/Examples

Any given string can be converted to a format suitable for Leo input. To accomplish this, there are two main functions:

To convert any given string to its bigint representation, the `stringConverter()` function can be called.

```javascript
import { stringConverter, formatInput } from "leostringer";

const string = "Easier string handling in Leo!";
const convertedInput = stringConverter(string);
```

Although the above function can convert strings to bigint representation according to the suitable number of data fields, it does not directly convert them to the format required for Leo inputs.

The `formatInput` function is used for this purpose.

```javascript
const formattedNew = formatInput(convertedInput);
```

The output of `formattedNew` will be as follows:

```bash
data1: ${convertedInput[0]}u128, data2: ${convertedInput[1]}u128, ...
```

Note that this requires the input parameters of your Leo program to be named as data1, data2, and so on.

A small interface which helps to calculate the data fields to put it into leo program will be added.

## Functions

While the process can be automated with simple functions, if you want full control over the library, you can use the functions listed below as well:

- `stringToBigInt`
- `bigIntToString`
- `splitStringToBigInts`
- `bigIntConverter`
- `autoPadArray`
- `calculateDataFieldsNeeded`
- `stringConverter` (Main)
- `formatInput` (Main)

## Reference

Although this library is designed to make the use of strings easier in the Leo building process, it is mainly used by Demox Labs in their [Art Factory](https://github.com/demox-labs/art-factory) app.

- [@demox-labs](https://github.com/demox-labs)

## Contributing

Pull requests are always welcome!

If you're considering major changes, please open an issue first to discuss your proposed alterations.
