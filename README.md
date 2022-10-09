# Just a Discord Bot

This is just a basic Discord bot, written in <span style="color:#DEA584;font-weight:700;">Rust</span>.

## What can this bot do?
Pretty much everything. Below, is a list of commands:

<ul>
  <li><code>help</code> - displays a list of commands & other resources</li>
  <li><code>role {role} {user}</code> - applies a role to a specified user (default user: command author)</li>
  <li><code>remove {role} {user}</code> - removes a role from a specified user (default user: command author)</li>
  <li><code>create {name} {color} {permissions}</code> - creates a new role</li>
  <li><code>delete {role}</code> - deletes a specified role</li>
  <li><code>ban {user} {reason} {length}</code> - bans a specified user (length default: permanent)</li>
  <li><code>kick {user} {reason}</code> - kicks a specified user</li>
  <li><code>warn {user} {reason}</code> - sends a direct warning message to a specified user</li>
  <li><code>tout {user} {reason} {length}</code> - applies a timeout to a specified user (length default: 1h)</li>
</ul>

## License
GNU GPL v3.0
