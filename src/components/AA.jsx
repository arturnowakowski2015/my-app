import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom";

import Table from "./Table";
import Settings from "./Settings";
import Select from "./Select"
import B from "./B";
import Delete from "./Delete";
import Update from "./Update";
import CheckboxInput from "./CheckboxInput";
import TreeNode from "./TreeNode";
import ButtonModal from "./ButtonModal";
import { tree } from '../data/dummy';
import '../index.css';
import UserContext from "../User";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
let stop = 0;
let items = [];
let y = [];
let arr = []
let choosen = ""
class AA extends React.Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      data: { new: [], selected: [1], opened: [2], removed: [3], labels: [4] },
      columns: [],
      strd: [],
      flagsettings: 0,
      postPerPage: 10,
      flag: 0,
      dff: -1,
      ending: "",
      str: "sssss",
      urls: [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos",
        "https://jsonplaceholder.typicode.com/users"
      ],
      i: 0,
      checked: true,
      icolumn: -1,
      settings: 0,
      change: false,
      changes: [],
      changeall: false,
      checkall: true,
      categories: ["new", ""]
    };
    this.setRec = this.setRec.bind(this);
    this.df = this.df.bind(this)
  }
  df(i, el) {
    alert(el[0].title)
  }


  furl(settingsid, idrec, bazaid, tryb, upstr) {

    this.setState({ i: bazaid })


    this.setState({ settings: settingsid });

    this.setState({ changes: [] });


    fetch(this.state.urls[bazaid])
      .then((response) => response.json())
      .then((response) => {
        // set the state 
        if (this.state.data[this.state.categories[0]].length == 0)
          this.state.data[this.state.categories[0]] = response


        this.setState({
          columns: Object.keys(response[0]).map((t) => {

            let d = { col: { name: "", disp: true } };
            d.col.name = null;

            return d;

          }

          )
        })
      });
    this.setState({ changes: arr })
  }
  changeRecits(e, p) {

    this.setState({ i: e })



    this.furl(0, 0, e, "u", "");
  }
  m(e) {
    this.setState({
      data: [this.state.categories[0]] = this.props.data.map((t, i) => {

        if (this.props.params.id == i) t.title = this.state.str;
        return t
      })
    })
    stop = 1
  }


  back() {
    window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf("/") + 1)

  }
  checkedCol(checked, index) {


    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return {
        icolumn: index,
        checked: checked
      }
    });



  }
  setRec() {
    let v = this.props.params.data;
    let t = v.map((t, i) => {
      if (this.props.params.id == i) t.title = this.props.params.str
      return t
    });
    this.setState({
      settings: 0,
      flag: 1,
      data: [this.state.categories[0]] = t
    });


  }



  componentDidMount() {

    console.log("count   " + this.props.params.count)
    if (stop == 0) {
      const r = this.props.params.id && this.props.params.f == undefined ? this.props.params.id : this.state.i;

      this.furl(this.state.settings, null, 0, "u", "dd d");
      console.log("  compunt       " + JSON.stringify(arr))
      this.setState({
        strd: this.state.urls.map((t, i) => (


          (<option value={i}>{t.slice(t.lastIndexOf("/"))}</option>)

        )),
        str: this.props.params.str
      });


    }
  };
  changePPP(value) {
    this.setState({ postPerPage: value })

  };







  render() {

    let change = false;
    const [count, updateCount] = this.context;
    arr = count.map((t) => t)
    function setch(i, r) {


      let arr = count.filter((t) => t.checked)

      if (arr.length >= 1)
        change = true;
      else
        change = false;


    }

    function allchtrue() {

      count = count.map((t) => { t.checked = "true"; return t })
    }

    function allchfalse() {

      count = count.map((t) => { t.checked = null; return t })
    }

    function deleteel() {
      let arr = count.filter((t) => t.checked == true)

      this.setState({
        data: [this.state.categories[0]] = this.state.data[this.state.categories[0]].filter(f => !arr.some(item => item.id === f.id))
      })

      //this.setState({ changes: this.state.changes.map((t) => { return   t.checked=false  })})
      //window.location.href = "/a/pagination"


    }
    function setchoosen(r) {
      this.state.data[this.state.categories[0]] = r

    }
    arr = count; console.log("eeee    " + JSON.stringify(this.state.data[this.state.categories[0]]))

    return (
      <div>{
      }
        {this.state.settings == 0 && this.props.params.f == undefined &&

          <div class="LT">
            <div class="TreeNode">
              <TreeNode changeintree={(category) => {


                if (this.state.categories) {
                  this.state.categories[1] = this.state.categories[0];
                  this.state.categories[0] = category
                }
              }} familyTree={tree.children} arr1={arr} count={count} prevCategory={this.state.categories[0]} id={0} depth={0} />
            </div>
            <div class="LTchild">
              <Link class="a2" to="/a/pagination/settings" onClick={() => this.setState({ settings: 1 })}>settings</Link>

              {arr.length > 0 &&
                <div>
                  <ButtonModal familyTree={tree.children}
                    checkall={() => {
                      this.setState({ checkall: !this.state.checkall });
                      (this.state.checkall ? updateCount("", 0, 1, this.state.data[this.state.categories[0]]) : updateCount("", 0, 2, this.state.data[this.state.categories[0]]))
                    }}
                    changecategory={(category, flag) => {
                      this.setState({ flag: 1 })
                      y = this.state.data[this.state.categories[0]].filter(f => arr.some(item => item.id === f.id))


                      this.state.data[this.state.categories[0]] = y
                      console.log("ll  2  " + JSON.stringify(this.state.data[this.state.categories[0]]))
                      y = this.state.data[this.state.categories[0]].filter(f => !arr.some(item => item.id === f.id))
                      this.state.data[this.state.categories[1]] = y
                    }
                    }
                    deleteel={() => {
                      let arr = count.filter((t) => t.checked == true)

                      this.setState({
                        data: [this.state.categories[0]] = this.state.data[this.state.categories[0]].filter(f => !arr.some(item => item.id === f.id))
                      })
                    }}
                  />
                </div>
              }


              <Table i={this.state.i} data={this.state.data[this.state.categories[0]]} setch={() => setch()} familyTree={tree.children}
                columns={this.state.columns.map((t, i) => {
                  if (i == this.state.icolumn && this.state.checked) t.col.disp = false;
                  else if (i == this.state.icolumn && this.state.checked == false) t.col.disp = true;

                  return t;
                })}
                flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
                dff={this.state.dff} str={this.props.params.str}
                items={items} furl={this.furl.bind(this)} id={this.state.i} flag={this.state.flag} settingsid={this.state.settings}
              />
            </div>

          </div>
        }



        {this.state.settings == 3 &&
          <div class="LT">
            <div class="TreeNode">aaaaa
              <Update i={this.state.i} furl={this.furl.bind(this)} />
              <TreeNode familyTree={tree.children} arr1={arr} id={0} depth={0} />
            </div>


          </div>

        }





        {
          this.state.settings == 1 && <div >

            <div class="LT">
              <div class="TreeNode">
                <TreeNode familyTree={tree.children} arr1={arr} id={0} depth={0} />
              </div>
              <div class="LTchild">
                <Settings data={this.state.data} columns={this.state.columns} changePPP={this.changePPP.bind(this)}
                  checkedCol={this.checkedCol.bind(this)}

                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage} />
                <Link class="a2" to="/a/pagination" onClick={() => this.setState({ settings: 0 })}>back to main</Link>
                <Link class="a2" to="/a/pagination/url" onClick={() => this.setState({ settings: 2 })}>change database</Link>



                <Table i={this.state.i} data={this.state.data[this.state.categories[0]]} setch={() => setch()} familyTree={tree.children}
                  columns={this.state.columns.map((t, i) => {
                    if (i == this.state.icolumn && this.state.checked) t.col.disp = false;
                    else if (i == this.state.icolumn && this.state.checked == false) t.col.disp = true;

                    return t;
                  })}
                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
                  dff={this.state.dff} str={this.props.params.str}
                  items={items} furl={this.furl.bind(this)} id={this.state.i} settingsid={this.state.settings}
                />




              </div>
            </div>
          </div>
        }

        {this.state.settings == 2 &&
          <Select changeRecits={this.changeRecits.bind(this)} strd={this.state.strd}

          />
        } </div>)
  }
}

export default withParams(AA);