# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## Current state

**This repository is an empty scaffold.** As of the last update to this file, it contains:

```
.
├── README.md   # single line: the project title
└── CLAUDE.md   # this file
```

There is **no source code, build system, dependency manifest, test suite, CI configuration, or tooling** yet. The project name "Cualquier-cosa" is Spanish for "anything" / "whatever", and the direction of the project is not yet defined.

Do not assume a language, framework, or architecture — none has been chosen. If a task implies one (e.g. "add a test", "run the build"), first check whether the relevant tooling now exists; if it does not, ask the user what stack they intend before scaffolding one.

## Git workflow

- **Default branch:** `main`
- **Remote:** `origin` → `https://github.com/deasith/Cualquier-cosa`
- Do not commit or push unless the user asks. When committing, use clear, descriptive messages.
- Push with `git push -u origin <branch-name>`. Do not open a pull request unless explicitly requested.

## When the project grows

Once real code lands, keep this file current. Update the sections below (and delete this instruction) as they become applicable:

- **Overview** — what the project does and its intended use.
- **Structure** — the actual directory layout and where key logic lives.
- **Setup** — how to install dependencies and get a working environment.
- **Build / run** — the commands to build and run the project locally.
- **Test / lint** — how to run tests and linters, and expectations before committing.
- **Conventions** — naming, formatting, commit-message style, and any patterns to follow.

Treat CLAUDE.md as living documentation: whenever you add tooling or establish a convention, record it here so the next assistant can follow it without rediscovery.
