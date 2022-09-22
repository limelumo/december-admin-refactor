export const getStorageItem = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key)
    if (!value) {
      return defaultValue
    }
    return value
  } catch {
    return defaultValue
  }
}

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    clearStorage()
    console.warn(e)
  }
}

export const getToken = () => {
  return getStorageItem('user', '')
}

export const setToken = (args) => {
  const { token } = args;
  setStorageItem('user', token);
}

export const clearStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.warn(error)
  }
}
