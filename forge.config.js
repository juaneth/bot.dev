module.exports = {
    packagerConfig: {
        icon: './src/public/icon'
    },
    rebuildConfig: {},
    "makers": [{
            "name": "@electron-forge/maker-squirrel",
            "authors": "juaneth",
            "config": {
                "name": "bot.dev",
                "icon": "./src/public/icon.ico",
                "loadingGif": "./src/public/installing.gif"
            }
        },
        {
            "name": "@electron-forge/maker-dmg",
            "config": {
                "platforms": [
                    "darwin"
                ],
                "overwrite": true,
                "name": "bot.dev",
                "AdditionalDMGOptions": {
                    "window": {
                        "size": {
                            "height": 700,
                            "width": 500
                        }
                    }
                }
            }
        },
        {
            "name": "@electron-forge/maker-zip"
        },
        {
            name: 'electron-forge-maker-appimage',
            platforms: ['linux'],
        },
    ],
};