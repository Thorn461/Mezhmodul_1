function exportJSON(storageKey, filename) {
    const data = localStorage.getItem(storageKey);
    if (!data) {
        alert("Нет сохранённых данных");
        return;
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename + ".json";
    a.click();

    URL.revokeObjectURL(url);
}

function importJSON(storageKey) {

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(event) {

        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {

            try {
                const data = JSON.parse(e.target.result);

                Object.keys(data).forEach(id => {
                    const el = document.getElementById(id);
                    if (!el) return;

                    if (el.type === 'checkbox') {
                        el.checked = data[id];
                    } else {
                        el.value = data[id];
                    }
                });

                localStorage.setItem(storageKey, JSON.stringify(data));
                alert("Данные успешно импортированы");

            } catch (error) {
                alert("Ошибка: файл не является корректным JSON");
            }
        };

        reader.readAsText(file);
    };

    input.click();
}
