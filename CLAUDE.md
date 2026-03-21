# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build, and Lint Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Run CLI in dev mode (tsx)
pnpm warelay <command>    # Run any CLI command via tsx
pnpm build                # Type-check and compile to dist/
```

## Architecture Overview

**warelay** is a TypeScript CLI (ESM, NodeNext) that relays WhatsApp messages via two providers:
- **Twilio provider** (`src/twilio/`): Full-featured with delivery tracking, webhooks, typing indicators
- **Web provider** (`src/provider-web.ts`): Personal WhatsApp via Baileys QR login, no delivery status

**Core structure:**
- `src/cli/` - CLI wiring, program setup, tmux integration
- `src/commands/` - Command implementations (send, relay, status, webhook)
- `src/twilio/` - Twilio client, senders, messages, typing, webhook handling
- `src/media/` - Media hosting, parsing, storage (handles images/attachments)
- `src/infra/` - Infrastructure utilities (ports, retry, tailscale/funnel, binaries)
- `src/config/` - User config (`~/.warelay/warelay.json`) and session store
- `src/process/` - Command queue (FIFO for auto-replies), exec wrapper
- `src/auto-reply/` - Auto-reply engine with templating and Claude integration

**Key patterns:**
- Dependency injection via `createDefaultDeps()` in `src/cli/deps.ts`
- Providers abstracted behind `Provider` type; `pickProvider()` selects based on availability
- Auto-reply uses a process-wide queue (`src/process/command-queue.ts`) to serialize Claude calls
- Session management (`src/config/sessions.ts`) supports per-sender or global scopes with idle expiration

**Data flow:**
1. Inbound messages arrive via Twilio webhook, Twilio polling, or Web listener
2. Auto-reply engine enqueues command execution (if configured)
3. Typing indicator sent while command runs
4. Response parsed (text or JSON) and sent back via same provider

**Configuration:**
- `.env` - Twilio credentials (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` or API key/secret, `TWILIO_WHATSAPP_FROM`)
- `~/.warelay/warelay.json` - Auto-reply config (JSON5)
- Credentials stored in `~/.warelay/credentials/` (Web provider)
