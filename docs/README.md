> 一个参考 jQuery 设计的开源 DOM 库

---

## API

### print()

---

- **详细:**

  打印出当前 aQuery 对象操作的元素

- **示例:**

  ```javascript
  $("body").print(); // NodeList [body]
  ```

### append(children)

---

- **详细:**

  向指定的节点中插入元素

- **示例:**

  ```javascript
  $("body").append($("<div>son</div>"));
  ```

### appendTo(Node)

---

- **详细:**

  将元素插入到指定的节点中

- **示例:**

  ```javascript
  $("<div>son</div>").appendTo($("body"));
  ```

### addClass(className)

---

- **详细:**

  添加类名

- **示例:**

  ```javascript
  $("body").addClass("red");
  ```

### remove()

---

- **详细:**

  删除元素

  > 删除后,该元素的引用仍会被保留,可继续操作

- **示例:**

  ```javascript
  $("<div>test</div").appendTo($("body")).remove();

  $("<div>test</div").appendTo($("body")).remove().appendTo($("body"));
  ```

### removeClass(className)

---

- **详细:**

  移除类名

- **示例:**

  ```javascript
  $("body").addClass("red");
  $("body").removeClass("red");
  ```

### attr(name, (value))

---

- **详细:**

  通过属性名称 获取/更改 元素的属性值

  - 若同时传递 name, value 参数, 将更改所有对应的属性值为 value
  - 若仅传递 name 参数,将返回一个由所有属性值所构成的数组

    !> 注意: 返回的数组将无法继续使用链式调用!!!

- **示例:**

  ```javascript
  $("<span id='readme'>README</span>")
    .appendTo($("body"))
    .attr("title", "通过attr(name, value)设置属性值");

  console.log($("#readme").attr("title")); // ["通过attr(name, value)设置属性值"];
  ```

### style(name, (value))

---

- **详细:**

  通过属性名称 获取/更改 元素的 style 样式

  - 若同时传递 name, value 参数, 将更改所有对应的属性值为 value
  - 若仅传递 name 参数且类型为 string,将返回一个由所有属性值所构成的数组
    !> 注意: 返回的数组将无法继续使用链式调用功能!!!
  - 若仅传递 name 参数且类型为 object,将把 Object 中的所有键值对视为 name 与 value

  !> 注意: 返回的数组将无法继续使用链式调用!!!

- **示例:**

  ```javascript
  $("body").style("background", "red");

  console.log($("body").style("background")); // ['red']

  $("body").style({ background: "blue" });

  console.log($("body").style("background")); // ['blue']
  ```

### parent()

---

- **详细:**

  以数组格式返回所有父元素

- **示例:**

  ```javascript
  $(
    "<div id='father1'><div class='son'>son1</div><div class='son'>son2</div></div>"
  ).appendTo($("body"));
  $("<div id='father2'><div class='son'>son3</div></div>").appendTo($("body"));

  $(".son").parent().print(); // [div#father1, div#father2]
  ```

### children()

---

- **详细:**

  以数组格式返回所有子元素

- **示例:**

  ```javascript
  $(
    "<div id='father1'><div class='son'>son1</div><div class='son'>son2</div></div>"
  ).appendTo($("body"));
  $("<div id='father2'><div class='son'>son3</div></div>").appendTo($("body"));

  $("#father1").children().print(); // [div.son, div.son]
  ```

### get(index)

---

- **详细:**

  通过数组下标找到并返回对应的元素

  !> 注意: 返回的元素无法继续使用链式调用!!!

- **示例:**

  ```javascript
  $("<ul><li id='1'>1</li><li id='2'>2</li><li id='3'>3</li></ul>").appendTo(
    $("body")
  );
  console.log($("li").get(0)); // li#1
  ```

### find(selector)

---

- **详细:**

  返回一个新的 api 对象，操作的元素为选择器所匹配的元素

- **示例:**

  ```javascript
  $("body").append($("<div>1<div>2</div></div>")).find("div").print(); // [div, div]
  ```

### each(fn)

---

- **详细:**

  对元素进行批量操作

- **示例:**

  ```javascript
  const printId = (el) => {
    console.log(el.id);
  };
  $("body").append(
    $("<ul><li id='1'>1</li><li id='2'>2</li><li id='3'>3</li><ul>")
  );
  $("li").each(printId);
  //1
  //2
  //3
  ```

### on(eventName, fn)

---

- **详细:**

  事件绑定

- **示例:**

  ```javascript
  const onClick = () => console.log("clicked");
  $("<button>click Me</button>").appendTo($("body")).on("click", onClick);
  ```

### off(eventName, fn)

---

- **详细:**

  解除事件绑定

  !> 如果事件绑定中传入的函数为匿名函数，将无法解除绑定

- **示例:**

  ```javascript
  const onClick = () => console.log("clicked");
  $("<button>click Me</button>")
    .appendTo($("body"))
    .on("click", onClick)
    .off("click", onClick);
  ```
