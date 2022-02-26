const weak_list = document.getElementById("weak_list");
const resistant_list = document.getElementById("resistant_list");
const immune_list = document.getElementById("immune_list");

const type_selection = document.querySelectorAll('input[name="type_selection"]')

document.getElementById("types").addEventListener("change", () => {
    // Clears All Lists
    while(weak_list.firstChild){
        weak_list.removeChild(weak_list.lastChild);
    };
    while(resistant_list.firstChild){
        resistant_list.removeChild(resistant_list.lastChild);
    };
    while(immune_list.firstChild){
        immune_list.removeChild(immune_list.lastChild);
    };

    // Find the Selected Radio Input
    for(const type of type_selection){
        if(type.checked){
            var selectedType = type.value;
        }
    }

    // Fetch PokeAPI
    fetch(`https://pokeapi.co/api/v2/type/${selectedType}/`)
        .then(response => response.json())
        .then(data => {
            var type_data = data.damage_relations;
            // Populate Lists
            for(let item in type_data.double_damage_from){
                let entry = document.createElement('li');
                entry.innerHTML = type_data.double_damage_from[item].name;
                weak_list.appendChild(entry);
            }
            for(let item in type_data.half_damage_from){
                let entry = document.createElement('li');
                entry.innerHTML = type_data.half_damage_from[item].name;
                resistant_list.appendChild(entry);
            }
            for(let item in type_data.no_damage_from){
                let entry = document.createElement('li');
                entry.innerHTML = type_data.no_damage_from[item].name;
                immune_list.appendChild(entry);
            }
        });
});