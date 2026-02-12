function initAutoSave(storageKey) {

    function save() {
        const data = {};
        const elements = document.querySelectorAll('input, textarea');

        elements.forEach(el => {
            if (!el.id) return;

            if (el.type === 'checkbox') {
                data[el.id] = el.checked;
            } else {
                data[el.id] = el.value;
            }
        });

        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function load() {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return;

        const data = JSON.parse(saved);

        Object.keys(data).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            if (el.type === 'checkbox') {
                el.checked = data[id];
            } else {
                el.value = data[id];
            }
        });
    }

    document.addEventListener('input', save);
    document.addEventListener('change', save);

    load();
}
