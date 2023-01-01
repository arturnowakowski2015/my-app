import React, { useState } from 'react';
import { recits } from "../data/dummy";
import Add from "./Add";
import Select from "./Select";
import S from "./S";

const Home = props => {
    const [strd, setStrd] = useState(props.recits.map((t, i) => (
        <option value={i}>{t.operation}</option>
    )));
    const [index, setIndex] = useState(0);
    const [todos, setTodos] = useState(props.recits);
    const add = (str) => {
        let ra = Math.random();

        let item = { "operation": "adding", "items": [{ "name": str + "QQQQQQQQQQ", "id": ra, "isActive": false, "display": "block" }], "id": todos.length - 1, "indexnow": 0 }
        let r = todos[index].items.slice();

        r.forEach((el) => {
            item.items.push(el)
        })

        todos.push(item)

        todos.forEach((recit, i) => { recit.id = i; recit.indexnow = todos.length - 1; });
        setIndex(todos[0].indexnow);
        setStrd(todos.map((t, i) => (
            <option value={i}>{t.operation}</option>
        )));

    }
    const changeRecits = (id) => {
        setIndex(id);
    }

    const deleteTask = (id, indexnow) => {
        let r = null;
        r = recits[indexnow].items.filter((task) => { return id !==== task.id });

        const newTask = { "operation": "delete", "items": r, "id": recits.length - 1, "indexnow": recits.length - 1 }


        todos.push(newTask);

        todos.forEach((recit, i) => { recit.id = i; recit.indexnow = todos.length - 1; });
        setIndex(todos[0].indexnow);
        setStrd(todos.map((t, i) => (
            <option value={i}>{t.operation}</option>
        )));
    }

    function editTask(id, indexnow, str) {
        let ra = Math.random();

        let item = { "operation": "ccccc", "items": [{ "name": str, "id": ra, "isActive": false, "display": "block" }], "id": 0, "indexnow": 0 }

        let r = todos[index].items.slice();

        r.forEach((el) => {
            if (el.id !==== id)
                item.items.push(el)
        })

        todos.push(item)

        setStrd(todos.map((t, i) => (
            <option value={i}>{t.operation}</option>
        )));
        todos.forEach((recit, i) => { recit.id = i; recit.indexnow = todos.length - 1; });
        setIndex(todos[0].indexnow);

    }
    const changeind = () => {

        setIndex(todos.length - 1);

    }

    return (
        <div>

            <Add todos={todos} index={index} changeind={changeind} add={add} />
            <Select
                changeRecits={changeRecits}
                strd={strd} />
            {todos[index].items.map((task, i) => {
                return (
                    <S
                        id={task.id}
                        name={task.name}
                        indexnow={recits[0].indexnow}
                        index={index}
                        key={task.id}
                        editTask={editTask}
                        deleteTask={deleteTask}
                        changeind={changeind}

                    />
                )
            })
            }
        </div>
    );
}


export default Home;