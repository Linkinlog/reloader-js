# Reloader

A simple utility to reload a web page after a certain period of inactivity.

## Usage
Check the [example.html](examples/index.html) for a simple example.
```javascript
import { Reloader } from "../reloader.js";

// Initialize with custom options
Reloader.init(
  30,     // (countTillWarn) Number of seconds until warning message is shown
  300,    // (countTillReload) Number of seconds until page reloads
  1000,   // (countIntervalMs) Interval in milliseconds to check for activity
  "",     // (warningMsg) Custom warning message (optional)
);
```

## Features
 - Monitors user activity and reloads the page after a specified period of inactivity
 - Customizable warning message and time limits
 - Simple and lightweight

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
