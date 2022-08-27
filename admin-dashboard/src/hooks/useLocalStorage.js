const useLocalStorage = (key) => {
    const setValue = (value) => {
        localStorage.setItem(key, value);
    };

    const remove = () => {
        localStorage.removeItem(key);
    };

    const getValue = () => localStorage.getItem(key);

    return {
        setValue,
        remove,
        getValue
    };
};

export default useLocalStorage;
