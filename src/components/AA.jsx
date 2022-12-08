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
      data: { new: [], selected: [], opened: [], removed: [], labels: [] },
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
      categories: { actual: [{ cat: "new", l: 0 }], new: [], set: ["new", "selected", "postponed", "removed"] }
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
        if (this.state.data[this.state.categories.actual[0].cat].length == 0)
          this.state.data[this.state.categories.actual[0].cat] = response
        this.state.categories.actual[0].l = response.length

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

  setcategories(category, actstr) {
    let obj2 = this.state.data[this.state.categories.actual[0].cat]
    let obj = null
    let el = 0;
    console.log(this.state.categories.actual[0].cat + ":" + category)
    if (this.state.categories.actual[0].cat != category) {
      obj = this.state.categories.new.filter((t) => t.cat != category)
      if (obj.length == 0) {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [el]
      }
      else
        this.state.categories.new = [... this.state.categories.new, el]
      if (this.state.categories.new.filter((t) => t.cat == category).length == 0) {
        this.state.categories.actual[0].cat = category;
        this.state.categories.actual[0].l = this.state.data[category].length
      }


      //   this.state.categories.actual[0].cat = category
      //  this.state.categories.actual[0].l = this.state.data[category].length;
    }

    return this.setState({ actual: this.state.categories.actual });
    //, this.state.categories.new)
    /*
    console.log(str1 + "::::" + actstr)
    if (str1 == "new" && str && str.filter((t) => t.cat == "new").length == 0) {

      obj2 = { cat: "new", l: this.state.data.new.length }
      let c = str.filter((t) => t.cat != actstr)
      console.log(obj2.cat + ":" + this.state.categories.actual[0].cat)
      if (obj2.cat != this.state.categories.actual[0].cat)
        if (c.length == 0) str = [obj2]
        else str = [...c, obj2]
    }
    if (str1 == "selected" && str && str.filter((t) => t.cat == "selected").length == 0) {

      obj2 = { cat: "selected", l: this.state.data.new.length }
      let c = str.filter((t) => t.cat != actstr)
      console.log(obj2.cat + ":" + this.state.categories.actual[0].cat)
      if (obj2.cat != this.state.categories.actual[0].cat)
        if (c.length == 0) str = [obj2]
        else str = [...c, obj2]
    } else {
      obj2 = { cat: actstr, l: this.state.data[actstr].length }
      let c = str.filter((t) => t.cat != actstr)
      console.log(obj2.cat + ":1" + actstr)
      if (obj2.cat != this.state.categories.actual[0].cat)
        if (c.length == 0) str = [obj2]
        else str = [...c, obj2]
    }
    if (str1 == "opened" && str.filter((t) => t.cat == "opened").length == 0) {
      obj2 = { cat: "opened", l: this.state.data.opened.length }
      let c = str.filter((t) => t.cat == "opened")
      if (obj2.cat != this.state.categories.actual[0].cat)
        str = [...c, obj2]
    }
    if (str1 == "removed" && str.filter((t) => t.cat == "removed").length == 0) {
      obj2 = { cat: "removed", l: this.state.data.removed.length }
      let c = str.filter((t) => t.cat == "removed")
      if (obj2.cat != this.state.categories.actual[0].cat)
        str = [...c, obj2]
    }
    if (str1 == "labels" && str.filter((t) => t.cat == "labels").length == 0) {
      obj2 = { cat: "labels", l: this.state.data.labels.length }
      let c = str.filter((t) => t.cat == "labels")
      if (obj2.cat != this.state.categories.actual[0].cat)
        str = [...c, obj2]
    }
    */
    console.log(JSON.stringify(this.state.categories.actual[0]) + "po " + JSON.stringify(this.state.categories.new))
  }
  changedata(category, flag) {
    let y2 = 0;
    let stop = 0;
    if (flag == 0 && this.state.data[category].length) {


      let l = this.state.data[category] ? this.state.data[category].length : 0;

      console.log(this.state.categories.actual[0].cat + "   ll  bbb  " + JSON.stringify(this.state.categories.new))
      this.setcategories(category, this.state.categories.actual[0].cat)
      stop = 1;


    }
    if (flag == 1) {
      if (this.state.data[category] || this.state.categories.actual[0].cat != category) {


        alert("alert " + this.state.data[category])
        if (this.state.data[category] == undefined || this.state.data[category] == "")
          this.state.data[category] = this.state.data[this.state.categories.actual[0].cat]
        alert("ale   rt " + this.state.data[category])
        y = this.state.data[category].filter(f => arr.some(item => item.id === f.id))
        y2 = this.state.data[category].filter(f => !arr.some(item => item.id === f.id))
        this.state.data[this.state.categories.actual[0].cat] = y2
        console.log("ll  actual  " + JSON.stringify(this.state.data[this.state.categories.actual[0].cat]))
        this.state.categories.actual[0].l = y2.length
        this.state.categories.new = [...this.state.categories.new, { cat: category, l: y.length }]
        this.state.data[category] = y
        this.setcategories(category, this.state.categories.actual[0].cat)
        // this.state.categories.actual[0].cat = category
      }
    } else if (flag == 0 && this.state.data[category].length && stop == 0) {
      alert(9090)
      console.log("9090  " + JSON.stringify(this.state.categories.new))
      this.state.data[this.state.categories.actual[0].cat] = this.state.data[category]
      this.state.categories.actual[0].l = this.state.data[category].length
      this.state.categories.actual[0].cat = category;
      this.setcategories(category, this.state.categories.actual[0].cat)

    }
    else alert("   no records !!");





  }




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

    arr = count;

    return (
      <div>{console.log("eeeeee  " + JSON.stringify(this.state.data[this.state.categories.actual[0].cat]))
      }
        {this.state.settings == 0 && this.props.params.f == undefined &&

          <div class="LT">
            <div class="TreeNode">
              <TreeNode changeintree={(category, flag) => this.changedata(category, flag)}


                familyTree={tree.children}
                menu={0}
                ac={this.state.categories.actual[0]}
                pc={this.state.categories.new} id={0} depth={0} />
            </div>
            <div class="LTchild">
              <Link class="a2" to="/a/pagination/settings" onClick={() => this.setState({ settings: 1 })}>settings</Link>

              {arr.length > 0 &&
                <div>
                  <ButtonModal familyTree={tree.children} menu={1}
                    checkall={() => {
                      this.setState({ checkall: !this.state.checkall });
                      (this.state.checkall ? updateCount("", 0, 1, this.state.data[this.state.categories[0]]) : updateCount("", 0, 2, this.state.data[this.state.categories[0]]))
                    }}
                    changecategory={(category, flag) => { this.changedata(category, flag) }

                    }

                    ac={this.state.categories.actual[0]}
                    deleteel={() => {
                      let arr = count.filter((t) => t.checked == true)

                      this.setState({
                        data: [this.state.categories[0]] = this.state.data[this.state.categories[0]].filter(f => !arr.some(item => item.id === f.id))
                      })
                    }}
                  />
                </div>
              }


              <Table i={this.state.i} data={this.state.data[this.state.categories.actual[0].cat]} setch={() => setch()} familyTree={tree.children}
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
              <TreeNode changeintree={(category, flag) => this.changedata(category, flag)}


                familyTree={tree.children}
                menu={0}
                ac={this.state.categories.actual[0]}
                pc={this.state.categories.new} id={0} depth={0} />
            </div>


          </div>

        }





        {
          this.state.settings == 1 && <div >

            <div class="LT">
              <div class="TreeNode">
                <TreeNode changeintree={(category, flag) => this.changedata(category, flag)}


                  familyTree={tree.children}
                  menu={0}
                  ac={this.state.categories.actual[0]}
                  pc={this.state.categories.new} id={0} depth={0} />
              </div>
              <div class="LTchild">
                <Settings data={this.state.data} columns={this.state.columns} changePPP={this.changePPP.bind(this)}
                  checkedCol={this.checkedCol.bind(this)}

                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage} />
                <Link class="a2" to="/a/pagination" onClick={() => this.setState({ settings: 0 })}>back to main</Link>
                <Link class="a2" to="/a/pagination/url" onClick={() => this.setState({ settings: 2 })}>change database</Link>



                <Table i={this.state.i} data={this.state.data[this.state.categories.actual[0].cat]} setch={() => setch()} familyTree={tree.children}
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