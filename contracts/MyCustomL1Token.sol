// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyCustomL1Token is ERC20 {
    constructor() ERC20("MyCustomL1Token", "MCTL1") {
        _mint(msg.sender, 1_000 * 10 ** decimals());
    }
}
