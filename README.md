# WordPress Boilerplate

WARNING: this template is for demonstration purposes only. This is no longer in use.

This template is specific to the requirements of an organization with certain requirements.

Local development was done with localwp, or lando.dev.

The boilerplate must support importing projects from agencies of all skill levels, and thus needs to be general enough to support all kinds of weird setups.

# Outline

## Directories
```
Directory Structure
├── root
│   ├── .circleci - CircleCI configuration
│   ├── .vscode - Debugger configuration
│   ├── bin - tools and scripts !do not use, these are included for reference only!
│   ├── config - configuration files
│   ├── public - WordPress root
```

## Files
```
.lando.upstream.yml - Lando configuration based on Pantheon's Lando configuration
composer.json - Composer configuration
package.json - NPM configuration, used for testing tools, and to build the theme on CCI.
```

Root/


# Usage

## New Projects

Ensure you have access to clone items from the Launch Brigade organization.

### Add boilerplate code

1. If you are using local.dev, create a new site.
1. Open a terminal and go up one level to the `app` folder in the site.
1. Run `git init` to make a blank repo
1. Then add this as the upstream: `git remote add upstream git@github.com:LaunchBrigade/wordpress-boilerplate.git`
1. Add the upstream files to the project: `git pull upstream`

### Add project specific code

Now you can create a repo on gihub.com and follow the instructions to add the origin remote to this project. The convention I've been using is to name the repo `sitename.tld` for example: `jurassicpark.com`

```
git remote add origin git@github.com:LaunchBrigade/sitename.tld.git
git push -u origin main
```

## Existing Projects

1. If you are using local.dev, create a new site.
2. Open a terminal and go up one level to the `app` folder in the site.

```
git init
git remote add origin git@github.com:LaunchBrigade/sitename.tld.git
git remote add upstream git@github.com:LaunchBrigade/wordpress-boilerplate.git
git pull origin main
```

## Composer
Run `composer install` to download the boilerplate themes nad plugins from github. Remove any your project doesn't need from the `require-dev` section. You don't have to remove the repository information.

## Database
You can install the database by exporting the sql file from kinsta using your favorate tool or by running the script `bin/db.sh` once the .env file is setup.

## SSH config

You need to add your SSH key to your kinsta account to enable passwordless login. Ideally we should be doing this on a per dev basis. No shared passwords.

https://kinsta.com/help/connect-to-ssh/#how-to-connect-to-ssh-with-ssh-keys

Get the SSH details from Kinsta and add an entry to your `~/.ssh/config` file

```shell
Host jurassicpark.kinsta.cloud
  Hostname 192.168.1.1
  User dennisnedry
  Port 1993
  IdentityFile ~/.ssh/cloudbrigade
```

Now in the project's .env file you can add `jurassicpark.kinsta.cloud` to the `LIVE_SSH` value. See the .env-example file.

```
# .env file
LIVE_SSH="jurassicpark.kinsta.cloud"
# The remote path on kinsta is always public
REMOTE_PATH="public"
```

## Getting new upstream changes

```
 git fetch --all

 ## merge changes from boilerplate
 git merge upstream/main

 ## merge changes from GitHub (origin remote)
 git merge origin/main

 ## Now you can push
```

## Plugins and Themes

Note: kinsta plugin can be installed from this link: https://kinsta.com/kinsta-tools/kinsta-mu-plugins.zip

## CircleCi

The default config is set up to push code to Kinsta. Add these variables to the project on app.circleci.com:

### Project variables

Get these from the Kinsta dashboard. Make sure to only add Staging info! You don't want to overwrite production each time someone pushes to main.

```
 PORT # Staging port number!
 HOSTNAME # can be the IP
 USER # The SSH user
```

### Add the shared key to circleCI

The setup is designed to use a shared key that has been uploaded under the main Kinsta account. You will need to upload the private key to Circle CI. Ask for the key on slack.
