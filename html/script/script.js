window.onload = function (){

    const comboBox = document.getElementById('select');
    const dataJson = {data: [{'id': 1, 'name': name1}, {'id': 2, 'name': name2}, {'id': 3, 'name': 'name3'}]};

    const valor0 = document.createElement('option');
    valor0.value = '0';
    valor0.textContent = 'Seleccione';
    comboBox.appendChild(valor0);
    dataJson.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        comboBox.appendChild(option);
    });
}


function cambioCombo (){
    const comboBox = document.getElementById('select');
    const selectedValue = comboBox.value;
    const selectedText = comboBox.options[comboBox.selectedIndex].text;
    console.log(selectedValue);
    console.log(selectedText);
}