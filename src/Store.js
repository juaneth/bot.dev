const storage = window.localStorage

export const AddNewBot = (name, path, token) => {
    if (storage.getItem(`bots.${name}`)) {
        return "Name Exists"
    }

    storage.setItem(name, path)
}
export const RemoveBot = (name, path) => {}

export const ManageBot = (name, path) => {}