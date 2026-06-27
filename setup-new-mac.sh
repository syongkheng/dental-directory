#!/usr/bin/env bash
#
# setup-new-mac.sh
# Bootstraps a fresh macOS machine with: Xcode CLT (git), Homebrew, nvm + Node/npm, iTerm2.
#
# Usage:
#   chmod +x setup-new-mac.sh
#   ./setup-new-mac.sh
#
set -euo pipefail

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }

if [[ "$(uname)" != "Darwin" ]]; then
  echo "This script is for macOS only." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# 1. Xcode Command Line Tools (ships git, make, clang, etc.)
# ---------------------------------------------------------------------------
log "Checking Xcode Command Line Tools"
if ! xcode-select -p &>/dev/null; then
  log "Installing Xcode Command Line Tools (a GUI prompt will appear)"
  xcode-select --install
  echo "Waiting for Command Line Tools installation to finish..."
  until xcode-select -p &>/dev/null; do
    sleep 5
  done
else
  echo "Already installed."
fi

# ---------------------------------------------------------------------------
# 2. Homebrew
# ---------------------------------------------------------------------------
log "Checking Homebrew"
if ! command -v brew &>/dev/null; then
  log "Installing Homebrew"
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Put brew on PATH for this script's remaining steps
  if [[ -d /opt/homebrew/bin ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -d /usr/local/bin ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
else
  echo "Already installed."
  eval "$(brew shellenv)"
fi

# Persist brew shellenv in the shell profile (zsh is default on modern macOS)
PROFILE="$HOME/.zprofile"
BREW_PREFIX="$(brew --prefix)"
if ! grep -q "brew shellenv" "$PROFILE" 2>/dev/null; then
  log "Adding Homebrew to $PROFILE"
  echo "eval \"\$(${BREW_PREFIX}/bin/brew shellenv)\"" >> "$PROFILE"
fi

log "Updating Homebrew"
brew update

# ---------------------------------------------------------------------------
# 3. git (CLT already provides one, but brew's is newer; keep it current)
# ---------------------------------------------------------------------------
log "Installing/upgrading git via Homebrew"
brew install git || brew upgrade git || true

# ---------------------------------------------------------------------------
# 4. nvm + Node.js/npm
# ---------------------------------------------------------------------------
log "Checking nvm"
export NVM_DIR="$HOME/.nvm"
if [[ ! -d "$NVM_DIR" ]]; then
  log "Installing nvm"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
else
  echo "Already installed."
fi

# Load nvm into this script's session
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

log "Installing latest LTS Node.js (brings npm along with it)"
nvm install --lts
nvm alias default 'lts/*'
nvm use default

# ---------------------------------------------------------------------------
# 5. iTerm2
# ---------------------------------------------------------------------------
log "Installing iTerm2"
if ! brew list --cask iterm2 &>/dev/null; then
  brew install --cask iterm2
else
  echo "Already installed."
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
log "Done. Installed versions:"
echo "git:  $(git --version)"
echo "node: $(node --version)"
echo "npm:  $(npm --version)"
echo "nvm:  $(nvm --version)"
echo
echo "Open a new terminal (or 'source ~/.zprofile') so PATH changes take effect."
echo "iTerm2 was installed to /Applications — launch it from there or Spotlight."
