async function sendQuery(query, variables={}) {
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: variables
        })
    });

    const json = await response.json();

    return json.data;
}

async function getSchema(objName) 
{
    const query = `
    {
        __type(name: "${objName}") {
          name,
          fields {
                name,
                type { name }
            }
        }
    }
    `;

    return await sendQuery(query);
}

const builders = {
    'Int': (fieldName, defaultValue=null) => {
        const container = document.createElement('div');

        const label     = document.createElement('label');
        label.for       = fieldName;
        label.innerHTML = fieldName;

        const input = document.createElement('input');
        input.id    = fieldName;
        input.name  = fieldName;
        input.type  = 'number';
        input.step  = '1';

        input.value = fieldName;
        if (defaultValue)
            input.value = defaultValue;

        container.appendChild(label);
        container.appendChild(input);

        return container;
    },

    'Float': (fieldName, defaultValue=null) => {
        const container = document.createElement('div');

        const label     = document.createElement('label');
        label.for       = fieldName;
        label.innerHTML = fieldName;


        const input = document.createElement('input');
        input.id    = fieldName;
        input.name  = fieldName;
        input.type  = 'number';
        input.step  = '0.01';

        input.value = fieldName;
        if (defaultValue)
            input.value = defaultValue;

        container.appendChild(label);
        container.appendChild(input);

        return container;
    },

    'String': (fieldName, defaultValue=null) => {
        const container = document.createElement('div');

        const label     = document.createElement('label');
        label.for       = fieldName;
        label.innerHTML = fieldName;


        const input = document.createElement('input');
        input.id    = fieldName;
        input.name  = fieldName;
        input.type  = 'string';

        input.value = fieldName;
        if (defaultValue)
            input.value = defaultValue;

        container.appendChild(label);
        container.appendChild(input);

        return container;
    },
}

const buildForm = (fields, onsubmit) => {
    const container  = document.createElement('form');
    container.action = "javascript:void(0);" 

    for (let field of fields) {
        const name = field.name;
        const type = field.type.name;
    
        if (type == 'ID')
            continue;
        if (!builders[type])
            container.appendChild(builders['String'](`${type}ID`));
        else
            container.appendChild(builders[type](name));
    }

    const submit   = document.createElement('input')
    submit.type    = 'submit';
    submit.onclick = () => onsubmit(container);
    container.appendChild(submit);

    return container;
}