// 去取得 localStorage 上方的資料，若沒有結果的話會回傳結果 null
// 使用短路求值
const todoListData = JSON.parse(localStorage.getItem('todoList')) || [];

// 去取得 DOM 上面 class 名稱是 todo-list 的節點
const todoList = document.querySelector('.todo-list');

// 去取得 todoList 中 class 名稱是 todo-list__form 的節點
const todoListFrom = todoList.querySelector('.todo-list__form');
// 去取得 todoListFrom 中的第一個 button 節點
const todoListFromButton = todoListFrom.querySelector('button');
// 去取得 todoListFrom 中的第一個 input 節點
const todoListFromInput = todoListFrom.querySelector('input');
// 去取得 todoList 中 class 名稱是 todo-list__tabs 的節點
const todoListTabs = todoList.querySelector('.todo-list__tabs');
// 去取得 todoList 中 class 名稱是 todo-list__items 的節點
const todoListItems = todoList.querySelector('.todo-list__items');

// 建立一個協助我們宣染頁面 todo list 的函式
const renderTodoList = () => {
  // 在此處先宣告一個將要被宣染到 html 的變數，沒有跟賦值一起操作是為了讓過程比較好修改與理解
  let todoListUI;

  // 讓要被宣染到 html 的物件，指定成一個 map 出來的新陣列，此處將會回傳一個 html 模板
  todoListUI = todoListData.map(function (element) {
    return `<li><h2>${element.title}</h2><span>${element.status}</span></li>`;
  });

  // 這裡可以個別將 todoListUI 與 todoListData 列印出來，並觀察其中的差異
  console.log(todoListData); // 陣列資料
  console.log(todoListUI); // 要被宣染到 html 的內容

  // 這裡會將 todoListItems 這個 node 節點所在的 html，置換為下方的其中一種方式
  // 這裡藉由三元運算式的方式，去判斷目前陣列是否有內容（用長度判斷），若沒有內容的話新增一個提示區塊
  todoListItems.innerHTML = todoListUI.length
    ? todoListUI.join('')
    : '<div class="todo-list__not-found">目前沒有內容</div>';
};

// 幫 todoListFromButton 這個節點新增按鈕點擊事件
todoListFromButton.addEventListener('click', function (event) {
  // 因為我們的 button 是放在 form 中，因此點擊時會直接觸發表單送出操作，這裡是將這一預設操作給停止
  event.preventDefault();

  //從 todoListFormInpum 上方取得他的數值
  const inputValue = todoListFromInput.value;

  //判斷input在被剪裁去空格之後，是否還有內容值，若變為空字串則會轉換為false
  if (!inputValue.trim()) {
    //將 todoListFromInput 的數值改為空字
    todoListFromInput.value = '';
    //將函式進行返回操作，當一個函式 return 時後面的程式將不會運作
    return;
  };

  //將 todoListFromInput 的數值改為空字串
  todoListFromInput.value = '';

  // 新增一筆資料到我們的 todoListData 這個 array 上面
  todoListData.push({ title: inputValue, status: '代辦' });
  // 將已經新增資料的陣列，轉成 JSON 格式之後上傳到 localStorage 上面，這裡的機碼(儲存位子)使用 todoList
  localStorage.setItem('todoList', JSON.stringify(todoListData));
  // 觸發畫面更新的函式，因為此時他所倚賴的陣列已經更新了內容，因此會在畫面上增加一筆項目
  renderTodoList();
});

//
renderTodoList();