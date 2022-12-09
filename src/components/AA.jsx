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
let config = 0;
let w = [];
let ii = 0;
let act = ""
let kk = 0;
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
      config: 0,
      categories: { actual: [{ cat: "new", l: 0 }], new: [], set: ["new", "selected", "postponed", "removed"] },
      parent: "",
      w: []



    };
    this.setRec = this.setRec.bind(this);
    this.df = this.df.bind(this)
  }
  df(i, el) {

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
  addel(nodes, w) {


    nodes.map((t, i) => {
      arr.push(t)
      ++ii;
      if (t.name == this.state.categories.new) {
        y = { name: t.name }
        act = arr[ii - 2].name
        this.state.w = arr[ii - 2].children
        this.setState({ w: this.state.w })

      }
      if (t.children)
        this.addel(t.children, w)


      return t

    })

    this.removeel(nodes)
  }

  removeel(nodes) {
    let kkj = 0;

    let l = []
    let g = []
    let y = nodes.filter((t, i) => {
      if (t.children) this.removeel(t.children)
      if (t.name == act) {

        l = t.children.map((tt) => { if (tt.name == this.state.categories.new) l = i })
        let ll = this.state.w.map((tt) => {
          console.log("  wwwww  " + JSON.stringify(tt))

          tt.children && tt.children.map((o, j) => {


            t.children.splice(l, 1, { name: o.name })
            kkj = j;
            kk = 2
          })
          // t.children.splice(l, 1, { name: tt.name })
        })

        if (kk != 2 && kkj == 0)
          t.children = []


      }
      return t;
    })
    this.setparent(nodes)
  }
  setparent(nodes) {

    nodes.map((t) => {

      if ((kk == 0 || kk == 2) && t.name == this.state.parent) {
        t.children.push(y)
        kk = 1;
      }
      console.log("y  " + JSON.stringify(nodes))
    })
    this.setState({ config: 0 })
  }
  setcategories(category, actstr) {
    let obj2 = this.state.data[this.state.categories.actual[0].cat]
    let obj = null
    let el = 0;

    if (this.state.categories.actual[0].cat != category) {
      obj = this.state.categories.new.filter((t) => t.cat != category)
      if (obj.length == 0) {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [el]
      } else {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [...obj, el]
      }
      if (this.state.categories.new.filter((t) => t.cat == category).length == 0) {

        this.state.categories.actual[0].cat = category;
        this.state.categories.actual[0].l = this.state.data[category].length
      }


      //   this.state.categories.actual[0].cat = category
      //  this.state.categories.actual[0].l = this.state.data[category].length;
    }
    console.log(this.state.parent + ":" + category)
    arr = 0;
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

    this.state.categories.new[0] = category;
    this.setState({ categories: this.state.categories })
    let y2 = 0;
    let stop = 0;
    if (flag == 0 && this.state.data[category] ? this.state.data[category].length : "") {



      let l = this.state.data[category] ? this.state.data[category].length : 0;

      console.log(this.state.categories.actual[0].cat + "   ll  bbb  " + JSON.stringify(this.state.categories.new))
      this.setcategories(category, this.state.categories.actual[0].cat)
      stop = 1;


    }
    if (flag == 1) {
      if (this.state.data[category] || this.state.categories.actual[0].cat != category) {



        if (this.state.data[category] == undefined || this.state.data[category] == "")
          this.state.data[category] = this.state.data[this.state.categories.actual[0].cat]

        let arr1 = arr.filter((t) => t != "")
        if (arr1.length != this.state.data[category].length) {
          y = this.state.data[category].filter(f => arr.some(item => item.id === f.id))
          y2 = this.state.data[category].filter(f => !arr.some(item => item.id === f.id))
        }
        else {
          y = this.state.data[category].filter(f => arr1.some(item => item.id === f.id && item.checked == true))
          y2 = this.state.data[category].filter(f => arr1.some(item => item.id === f.id && item.checked == false))
        }
        this.state.data[this.state.categories.actual[0].cat] = y2
        console.log("ll  actual  " + JSON.stringify(this.state.data[this.state.categories.actual[0].cat]))
        this.state.categories.actual[0].l = y2.length
        this.state.categories.new = [...this.state.categories.new, { cat: category, l: y.length }]
        this.state.data[category] = y
        this.setcategories(category, this.state.categories.actual[0].cat)
        // this.state.categories.actual[0].cat = category
      }
    } else if (flag == 0 && this.state.data[category].length && stop == 0) {

      console.log("9090  " + JSON.stringify(this.state.categories.new))
      this.state.data[this.state.categories.actual[0].cat] = this.state.data[category]
      this.state.categories.actual[0].l = this.state.data[category].length
      this.state.categories.actual[0].cat = category;
      this.setcategories(category, this.state.categories.actual[0].cat)

    }
    else alert("   no records !!");





  }



  changeparent(name) {
    this.setState({ parent: name })
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

    //arr = count;

    return (
      <div>            {console.log("2222      " + JSON.stringify(config))
      }
        {this.state.settings == 0 && this.props.params.f == undefined &&

          <div class="LT">
            <div class="TreeNode">
              {this.state.config == 0 && <div><TreeNode changeintree={(category, flag) => { this.changedata(category, flag); updateCount("", 0, 3) }}
                changeparent={(name) => this.setState({ parent: name })}
                config={this.state.config}
                familyTree={tree.children}
                menu={0}
                ac={this.state.categories.actual[0]}
                pc={this.state.categories.new} id={0} depth={0}
                l={this.state.data[this.state.categories.actual[0].cat].length}
                parent={this.state.parent} />
                {this.state.parent == "" && <button onClick={(config) => { this.setState({ config: 1 }) }}>config {this.state.categories.new[0]}</button>}


              </div>
              }
              {this.state.config == 1 && <div><TreeNode changeintree={(category, flag) => { this.changedata(category, flag); updateCount("", 0, 3) }}
                changeparent={(name) => this.setState({ parent: name })}
                config={this.state.config}
                familyTree={tree.children}
                menu={0}
                ac={this.state.categories.actual[0]}
                pc={this.state.categories.new} id={0} depth={0}
                l={this.state.data[this.state.categories.actual[0].cat].length}
                parent={this.state.parent} />
                <button onClick={() => this.addel(tree.children, w)}>set {this.state.categories.new[0]}</button>
              </div>
              }

            </div>
            <div class="LTchild">
              <Link class="a2" to={"/a/" + this.state.categories.actual[0].cat + "/pagination/settings"} onClick={() => this.setState({ settings: 1 })}>settings</Link>

              {arr.length > 0 &&
                <div>
                  <ButtonModal familyTree={tree.children} menu={1}
                    checkall={() => {
                      this.setState({ checkall: !this.state.checkall });
                      (this.state.checkall ? updateCount("", 0, 1, this.state.data[this.state.categories.actual[0].cat])
                        : updateCount("", 0, 2, this.state.data[this.state.categories.actual[0].cat]))
                    }}
                    changecategory={(category, flag) => {
                      this.changedata(category, flag);
                      arr = count.map((t) => t.checked = false)
                      updateCount("", 0, 3)
                    }

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
                acturl={this.state.categories.actual[0].cat}
              />
            </div>

          </div>
        }



        {this.state.settings == 3 &&
          <div class="LT">
            <div class="TreeNode">aaaaa
              <Update i={this.state.i} furl={this.furl.bind(this)} acturl={this.state.categories.actual[0].cat} />
              <TreeNode changeintree={(category, flag) => this.changedata(category, flag)}

                changeparent={this.changeparent.bind(this)}
                familyTree={tree.children}
                menu={0}
                ac={this.state.categories.actual[0]}
                pc={this.state.categories.new} id={0} depth={0}
                l={this.state.data[this.state.categories.actual[0].cat].length} parent={this.state.parent} />

            </div>


          </div>

        }





        {
          this.state.settings == 1 && <div >

            <div class="LT">
              <div class="TreeNode">
                <TreeNode changeintree={(category, flag) => { this.changedata(category, flag); updateCount("", 0, 3) }}
                  changeparent={(name) => this.setState({ parent: name })}
                  config={this.state.config}
                  familyTree={tree.children}
                  menu={0}
                  ac={this.state.categories.actual[0]}
                  pc={this.state.categories.new} id={0} depth={0}
                  l={this.state.data[this.state.categories.actual[0].cat].length}
                  parent={this.state.parent} />

              </div>
              <div class="LTchild">
                <Settings data={this.state.data} columns={this.state.columns} changePPP={this.changePPP.bind(this)}
                  checkedCol={this.checkedCol.bind(this)}

                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage} />
                <Link class="a2" to={"/a/" + this.state.categories.actual[0].cat + "/pagination"} onClick={() => this.setState({ settings: 0 })}>back to main</Link>
                <Link class="a2" to={"/a/" + this.state.categories.actual[0].cat + "/pagination/url"} onClick={() => this.setState({ settings: 2 })}>change database</Link>



                <Table i={this.state.i} data={this.state.data[this.state.categories.actual[0].cat]} setch={() => setch()} familyTree={tree.children}
                  columns={this.state.columns.map((t, i) => {
                    if (i == this.state.icolumn && this.state.checked) t.col.disp = false;
                    else if (i == this.state.icolumn && this.state.checked == false) t.col.disp = true;

                    return t;
                  })}
                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
                  dff={this.state.dff} str={this.props.params.str}
                  items={items} furl={this.furl.bind(this)} id={this.state.i} settingsid={this.state.settings}
                  acturl={this.state.categories.actual[0].cat}
                />




              </div>
            </div>
          </div>
        }

        {this.state.settings == 2 &&
          <Select acturl={this.state.categories.actual[0].cat} changeRecits={this.changeRecits.bind(this)} strd={this.state.strd}

          />
        } </div>)
  }
}

export default withParams(AA);