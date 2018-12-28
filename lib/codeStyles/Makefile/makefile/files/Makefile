# ===========================
# Default: help section
# ===========================

info: intro do-show-commands
intro:
	@echo "\nCreate a nice header using http://patorjk.com/software/taag/"

# ===========================
# Main commands
# ===========================

init: intro do-pre-init do-install-git-hooks do-run-updates do-post-init do-show-commands
update-project: intro do-run-updates
github: intro do-checkout-pr do-run-updates
gitlab: intro do-checkout-mr do-run-updates
git-hooks: intro do-install-git-hooks

pre-commit: intro do-test-pre-commit do-commit-intro

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\n=== Make commands ===\n"
	@echo "Project:"
	@echo "    make init                       Initialise the project for development."
	@echo "    make update-project             Install all dependencies and generate required files."
	@echo "    make github PR=<number>         Check out a PR from GitHub and update the project."
	@echo "    make gitlab MR=<number>         Check out a PR from GitLab and update the project."
	@echo "    make git-hooks                  Install the available git hooks."

do-pre-init:
	@echo "\n=== Pre initialisation ===\n"
	# Do what you have to do pre-initialisation

do-post-init:
	@echo "\n=== Post initialisation ===\n"
	# Do what you have to do post-initialisation

do-checkout-pr:
	@if [ -z $$PR ]; then echo "No PR number is set, please run:\nmake github PR=<number>"; exit 1; fi
	@echo "\n=== Checking out Pull Request $$PR ===\n"
	git fetch upstream refs/pull/$$PR/head:refs/remotes/upstream/pr/$$PR
	git checkout upstream/pr/$$PR

do-checkout-mr:
	@if [ -z $$MR ]; then echo "No MR number is set, please run:\nmake gitlab MR=<number>"; exit 1; fi
	@echo "\n=== Checking out Merge Request $$MR ===\n"
	git fetch upstream refs/merge-requests/$$MR/head:refs/remotes/upstream/merge-requests/$$MR
	git checkout upstream/merge-requests/$$MR

do-run-updates:
	@echo "\n=== Updating project ===\n"
	# Run everything to update your project dependencies here

do-test-pre-commit:
	@echo "\n=== Testing pre-commit ===\n"
	# Do run all tests to verify your code is ready to be commited
	# For example: eslint, prettier, unit tests...

do-commit-intro:
	@echo "\n=== Committing ===\n"

do-install-git-hooks:
	@echo "\n=== Installing git hooks ===\n"
	cp dev/git-hooks/* .git/hooks
	chmod +x .git/hooks/*
