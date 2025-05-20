// 学生名单数据
const students = [
    "卜家豪", "陈亚欣", "丁晓萱", "董恩浩", "段鹏松", "房茜卓",
    "高俊腾", "高鹿桐", "谷天乐", "何沛洋", "贾旭", "靳思同",
    "李凤豪", "李嘉兴", "李建宇", "李万琪", "李欣宇", "李业勤",
    "刘百刚", "刘冰倩", "刘峻泽", "刘一翔", "刘宇倩", "刘志龙",
    "毛诚一", "邵尚薇", "孙健玮", "王宪斌", "王政皓", "王志甲",
    "王子林", "吴梦瑶", "邢嘉旺", "徐佳慧", "许珈玮", "张连祥",
    "张淑恒", "张韵", "张照毅", "张智", "张璐璐", "赵含蕊",
    "赵正阳", "赵珈艺", "祝祥和"
];

// DOM元素
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const selectedStudentEl = document.getElementById('selectedStudent');
const studentListEl = document.getElementById('studentList');

// 变量
let timer = null;
let currentIndex = 0;
let lastHighlightedIndex = -1; // 记录上一个被高亮的学生索引

// 初始化花名册
function initRoster() {
    studentListEl.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student;
        li.dataset.index = index;
        studentListEl.appendChild(li);
    });
}

// 清除所有高亮
function clearAllHighlights() {
    const highlightedItems = studentListEl.querySelectorAll('.highlight');
    highlightedItems.forEach(item => {
        item.classList.remove('highlight');
    });
}

// 随机选择学生
function randomSelect() {
    // 清除之前的高亮
    clearAllHighlights();
    
    do {
        // 生成新的随机索引
        currentIndex = Math.floor(Math.random() * students.length);
    } while (currentIndex === 23); // 确保不会选到索引为23的学生
    
    selectedStudentEl.textContent = students[currentIndex];
    
    // 高亮显示当前选中的学生
    const currentSelected = studentListEl.querySelector(`li[data-index="${currentIndex}"]`);
    if (currentSelected) {
        currentSelected.classList.add('highlight');
        lastHighlightedIndex = currentIndex;
    }
}

// 开始点名
function startRollCall() {
    if (timer) return;
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // 每100毫秒更换一个随机名字
    timer = setInterval(randomSelect, 100);
}

// 停止点名
function stopRollCall() {
    if (!timer) return;
    
    clearInterval(timer);
    timer = null;
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // 保持最后一个被点到的学生高亮
    if (lastHighlightedIndex >= 0) {
        const lastSelected = studentListEl.querySelector(`li[data-index="${lastHighlightedIndex}"]`);
        if (lastSelected) {
            lastSelected.classList.add('called');
        }
    }
}

// 事件监听
startBtn.addEventListener('click', startRollCall);
stopBtn.addEventListener('click', stopRollCall);

// 初始化
initRoster();