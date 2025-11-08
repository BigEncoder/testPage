// 邮件数据存储
let emails = [
    {
        id: 1,
        sender: '张三',
        senderEmail: 'zhangsan@example.com',
        subject: '项目进度更新',
        content: '您好，\n\n本次邮件是关于项目进度的更新。目前项目进展顺利，预计下周可以完成第一阶段的工作。\n\n主要完成内容：\n1. 完成了用户界面的优化\n2. 实现了新的搜索功能\n3. 修复了已知的bug\n\n如有任何问题，请随时联系我。\n\n谢谢！',
        time: '2024-01-15 10:30',
        read: false,
        important: true,
        tag: '工作',
        status: 'inbox'
    },
    {
        id: 2,
        sender: '李四',
        senderEmail: 'lisi@example.com',
        subject: '会议邀请',
        content: '您好，\n\n诚邀您参加本周五下午2点的团队会议。会议将讨论下个季度的项目计划。\n\n会议议程：\n- 项目回顾\n- 下季度计划\n- 资源分配\n\n期待您的参与！',
        time: '2024-01-14 15:20',
        read: false,
        important: false,
        tag: '工作',
        status: 'inbox'
    },
    {
        id: 3,
        sender: '王五',
        senderEmail: 'wangwu@example.com',
        subject: '工作报告',
        content: '本周工作报告已提交，请查收。主要内容包括：\n1. 完成了系统优化\n2. 修复了3个bug\n3. 准备下周的开发计划\n\n详细报告请查看附件。',
        time: '2024-01-13 09:15',
        read: true,
        important: false,
        tag: '项目',
        status: 'inbox'
    },
    {
        id: 4,
        sender: '赵六',
        senderEmail: 'zhaoliu@example.com',
        subject: '重要通知：系统维护',
        content: '通知：系统将于本周末进行维护，维护时间为周六晚上10点至周日早上6点。在此期间系统将无法访问，请提前做好准备。\n\n维护内容：\n- 数据库优化\n- 服务器升级\n- 安全补丁更新',
        time: '2024-01-12 14:45',
        read: true,
        important: true,
        tag: '通知',
        status: 'inbox'
    },
    {
        id: 5,
        sender: '孙七',
        senderEmail: 'sunqi@example.com',
        subject: '感谢您的反馈',
        content: '感谢您对我们产品的反馈。我们已经仔细研究了您的建议，并会在下一版本中考虑实施。\n\n您的建议对我们非常重要，我们会持续改进产品体验。',
        time: '2024-01-11 11:30',
        read: true,
        important: false,
        tag: '个人',
        status: 'inbox'
    },
    {
        id: 6,
        sender: '周八',
        senderEmail: 'zhouba@example.com',
        subject: '培训课程邀请',
        content: '我们即将举办一次技术培训课程，主题是"前端开发最佳实践"。如果您感兴趣，欢迎报名参加。\n\n课程时间：下周三下午2-5点\n地点：会议室A',
        time: '2024-01-10 16:00',
        read: false,
        important: false,
        tag: '工作',
        status: 'inbox'
    },
    {
        id: 7,
        sender: '吴九',
        senderEmail: 'wujiu@example.com',
        subject: '项目里程碑达成',
        content: '恭喜！我们的项目已经成功完成了第一个重要里程碑。感谢团队所有成员的辛勤工作。',
        time: '2024-01-09 13:20',
        read: true,
        important: true,
        tag: '项目',
        status: 'inbox'
    },
    {
        id: 8,
        sender: '郑十',
        senderEmail: 'zhengshi@example.com',
        subject: '周末聚餐邀请',
        content: '大家好，这周末我们组织一次团队聚餐，时间定在周六晚上6点，地点是市中心的海鲜餐厅。欢迎大家参加！',
        time: '2024-01-08 17:45',
        read: false,
        important: false,
        tag: '个人',
        status: 'inbox'
    },
    {
        id: 9,
        sender: '我',
        senderEmail: 'me@example.com',
        subject: '关于新功能的讨论',
        content: '收件人: team@example.com\n\n大家好，我想和大家讨论一下新功能的实现方案，请查看附件中的设计文档。',
        time: '2024-01-07 10:15',
        read: true,
        important: false,
        tag: '工作',
        status: 'sent'
    },
    {
        id: 10,
        sender: '我',
        senderEmail: 'me@example.com',
        subject: '草稿：季度总结报告',
        content: '这是季度总结报告的草稿，还需要进一步完善...',
        time: '2024-01-06 14:30',
        read: true,
        important: false,
        tag: '工作',
        status: 'draft'
    }
];

let currentFilter = 'all';
let currentTag = null;
let currentEmailId = null;
let searchQuery = '';
let currentView = 'list';
let sortBy = 'time-desc';
let selectedEmails = new Set();
let settings = {
    autoMarkRead: true,
    showPreview: false,
    emailsPerPage: 20,
    emailNotifications: true,
    soundNotifications: false,
    themeColor: 'purple'
};

// DOM 元素
const emailList = document.getElementById('emailList');
const emailDetail = document.getElementById('emailDetail');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const composeModal = document.getElementById('composeModal');
const settingsModal = document.getElementById('settingsModal');
const composeBtn = document.getElementById('composeBtn');
const settingsBtn = document.getElementById('settingsBtn');
const composeForm = document.getElementById('composeForm');
const closeModal = document.querySelector('.close');
const closeSettings = document.getElementById('closeSettings');
const cancelBtn = document.getElementById('cancelBtn');
const saveDraftBtn = document.getElementById('saveDraftBtn');
const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const menuItems = document.querySelectorAll('.menu-item[data-filter]');
const tagItems = document.querySelectorAll('.tag-item');
const selectAll = document.getElementById('selectAll');
const markReadBtn = document.getElementById('markReadBtn');
const markUnreadBtn = document.getElementById('markUnreadBtn');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const refreshBtn = document.getElementById('refreshBtn');
const sortSelect = document.getElementById('sortSelect');
const viewBtns = document.querySelectorAll('.view-btn');
const notification = document.getElementById('notification');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderEmailList();
    updateStats();
    updateBadges();
    setupEventListeners();
    loadSettings();
});

// 设置事件监听器
function setupEventListeners() {
    // 搜索功能
    searchBtn.addEventListener('click', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim()) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
    });

    // 菜单过滤
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            currentFilter = item.getAttribute('data-filter');
            currentTag = null;
            selectedEmails.clear();
            selectAll.checked = false;
            renderEmailList();
        });
    });

    // 标签过滤
    tagItems.forEach(item => {
        item.addEventListener('click', () => {
            currentTag = item.getAttribute('data-tag');
            currentFilter = 'all';
            menuItems.forEach(mi => mi.classList.remove('active'));
            selectedEmails.clear();
            selectAll.checked = false;
            renderEmailList();
        });
    });

    // 写邮件
    composeBtn.addEventListener('click', () => {
        composeModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        composeModal.style.display = 'none';
        composeForm.reset();
    });

    cancelBtn.addEventListener('click', () => {
        composeModal.style.display = 'none';
        composeForm.reset();
    });

    saveDraftBtn.addEventListener('click', () => {
        saveDraft();
    });

    // 设置
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    cancelSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    saveSettingsBtn.addEventListener('click', () => {
        saveSettings();
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === composeModal) {
            composeModal.style.display = 'none';
            composeForm.reset();
        }
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // 提交邮件表单
    composeForm.addEventListener('submit', handleComposeSubmit);

    // 批量操作
    selectAll.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.email-item input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.checked = e.target.checked;
            const emailId = parseInt(cb.dataset.emailId);
            if (e.target.checked) {
                selectedEmails.add(emailId);
            } else {
                selectedEmails.delete(emailId);
            }
        });
    });

    markReadBtn.addEventListener('click', () => {
        batchMarkRead();
    });

    markUnreadBtn.addEventListener('click', () => {
        batchMarkUnread();
    });

    deleteSelectedBtn.addEventListener('click', () => {
        batchDelete();
    });

    refreshBtn.addEventListener('click', () => {
        renderEmailList();
        updateStats();
        updateBadges();
        showNotification('邮件列表已刷新');
    });

    // 排序
    sortSelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        renderEmailList();
    });

    // 视图切换
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.getAttribute('data-view');
            renderEmailList();
        });
    });
}

// 处理搜索
function handleSearch() {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderEmailList();
    if (searchQuery) {
        clearSearchBtn.style.display = 'block';
    }
}

// 清除搜索
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderEmailList();
}

// 渲染邮件列表
function renderEmailList() {
    let filteredEmails = emails.filter(email => email.status !== 'trash');

    // 应用过滤器
    if (currentFilter === 'unread') {
        filteredEmails = filteredEmails.filter(email => !email.read);
    } else if (currentFilter === 'read') {
        filteredEmails = filteredEmails.filter(email => email.read);
    } else if (currentFilter === 'important') {
        filteredEmails = filteredEmails.filter(email => email.important);
    } else if (currentFilter === 'sent') {
        filteredEmails = filteredEmails.filter(email => email.status === 'sent');
    } else if (currentFilter === 'draft') {
        filteredEmails = filteredEmails.filter(email => email.status === 'draft');
    } else if (currentFilter === 'trash') {
        filteredEmails = emails.filter(email => email.status === 'trash');
    }

    // 应用标签过滤
    if (currentTag) {
        filteredEmails = filteredEmails.filter(email => email.tag === currentTag);
    }

    // 应用搜索
    if (searchQuery) {
        filteredEmails = filteredEmails.filter(email => 
            email.sender.toLowerCase().includes(searchQuery) ||
            email.subject.toLowerCase().includes(searchQuery) ||
            email.content.toLowerCase().includes(searchQuery) ||
            email.senderEmail.toLowerCase().includes(searchQuery)
        );
    }

    // 排序
    filteredEmails.sort((a, b) => {
        switch (sortBy) {
            case 'time-asc':
                return new Date(a.time) - new Date(b.time);
            case 'sender-asc':
                return a.sender.localeCompare(b.sender);
            case 'subject-asc':
                return a.subject.localeCompare(b.subject);
            case 'time-desc':
            default:
                return new Date(b.time) - new Date(a.time);
        }
    });

    emailList.innerHTML = '';

    if (filteredEmails.length === 0) {
        emailList.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;"><div style="font-size: 48px; margin-bottom: 10px;">📭</div><p>没有找到邮件</p></div>';
        return;
    }

    filteredEmails.forEach(email => {
        const emailItem = createEmailItem(email);
        emailList.appendChild(emailItem);
    });
}

// 创建邮件项
function createEmailItem(email) {
    const item = document.createElement('div');
    item.className = `email-item ${email.read ? '' : 'unread'} ${email.important ? 'important' : ''} ${currentView === 'compact' ? 'compact' : ''}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.emailId = email.id;
    checkbox.checked = selectedEmails.has(email.id);
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            selectedEmails.add(email.id);
        } else {
            selectedEmails.delete(email.id);
            selectAll.checked = false;
        }
    });
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const avatar = document.createElement('div');
    avatar.className = 'email-avatar';
    avatar.textContent = email.sender.charAt(0);

    const info = document.createElement('div');
    info.className = 'email-info';

    const sender = document.createElement('div');
    sender.className = 'email-sender';
    sender.textContent = email.sender;

    const subject = document.createElement('div');
    subject.className = 'email-subject';
    subject.innerHTML = email.subject + (email.tag ? ` <span class="email-tag ${getTagClass(email.tag)}">${email.tag}</span>` : '');

    const preview = document.createElement('div');
    preview.className = 'email-preview';
    preview.textContent = email.content.substring(0, 50) + '...';

    const time = document.createElement('div');
    time.className = 'email-time';
    time.textContent = formatTime(email.time);

    info.appendChild(sender);
    info.appendChild(subject);
    if (currentView !== 'compact') {
        info.appendChild(preview);
    }

    item.appendChild(checkbox);
    item.appendChild(avatar);
    item.appendChild(info);
    item.appendChild(time);

    item.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            showEmailDetail(email.id);
        }
    });

    return item;
}

// 获取标签样式类
function getTagClass(tag) {
    const tagMap = {
        '工作': 'work',
        '个人': 'personal',
        '项目': 'project',
        '通知': 'notification'
    };
    return tagMap[tag] || '';
}

// 显示邮件详情
function showEmailDetail(emailId) {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;

    // 自动标记为已读
    if (!email.read && settings.autoMarkRead) {
        email.read = true;
        renderEmailList();
        updateStats();
        updateBadges();
    }

    currentEmailId = emailId;

    const tagHTML = email.tag ? `<span class="email-tag ${getTagClass(email.tag)}">${email.tag}</span>` : '';

    const detailHTML = `
        <div class="email-detail-content active">
            <div class="detail-header">
                <div class="detail-subject">${escapeHtml(email.subject)}${tagHTML}</div>
                <div class="detail-meta">
                    <div><strong>发件人：</strong>${escapeHtml(email.sender)} &lt;${escapeHtml(email.senderEmail)}&gt;</div>
                    <div><strong>时间：</strong>${escapeHtml(email.time)}</div>
                    ${email.status === 'sent' ? '<div><strong>状态：</strong>已发送</div>' : ''}
                    ${email.status === 'draft' ? '<div><strong>状态：</strong>草稿</div>' : ''}
                </div>
            </div>
            <div class="detail-body">${escapeHtml(email.content)}</div>
            <div class="detail-actions">
                <button class="btn ${email.read ? 'btn-secondary' : 'btn-success'}" onclick="toggleRead(${email.id})">
                    ${email.read ? '标记为未读' : '标记为已读'}
                </button>
                <button class="btn ${email.important ? 'btn-secondary' : 'btn-primary'}" onclick="toggleImportant(${email.id})">
                    ${email.important ? '取消重要' : '标记重要'}
                </button>
                ${email.status !== 'trash' ? `<button class="btn btn-danger" onclick="deleteEmail(${email.id})">删除</button>` : ''}
                ${email.status === 'trash' ? `<button class="btn btn-success" onclick="restoreEmail(${email.id})">恢复</button>` : ''}
            </div>
        </div>
    `;

    emailDetail.innerHTML = detailHTML;
    emailDetail.classList.add('active');
}

// 切换已读/未读状态
function toggleRead(emailId) {
    const email = emails.find(e => e.id === emailId);
    if (email) {
        email.read = !email.read;
        renderEmailList();
        updateStats();
        updateBadges();
        if (currentEmailId === emailId) {
            showEmailDetail(emailId);
        }
        showNotification(email.read ? '已标记为已读' : '已标记为未读');
    }
}

// 切换重要状态
function toggleImportant(emailId) {
    const email = emails.find(e => e.id === emailId);
    if (email) {
        email.important = !email.important;
        renderEmailList();
        updateStats();
        updateBadges();
        if (currentEmailId === emailId) {
            showEmailDetail(emailId);
        }
        showNotification(email.important ? '已标记为重要' : '已取消重要标记');
    }
}

// 删除邮件
function deleteEmail(emailId) {
    const email = emails.find(e => e.id === emailId);
    if (email) {
        email.status = 'trash';
        renderEmailList();
        updateStats();
        updateBadges();
        emailDetail.innerHTML = '<div class="detail-placeholder"><div class="placeholder-icon">📧</div><p>选择一个邮件查看详情</p><p class="placeholder-hint">点击左侧邮件列表中的任意邮件</p></div>';
        emailDetail.classList.remove('active');
        currentEmailId = null;
        showNotification('邮件已移至垃圾箱');
    }
}

// 恢复邮件
function restoreEmail(emailId) {
    const email = emails.find(e => e.id === emailId);
    if (email) {
        email.status = 'inbox';
        renderEmailList();
        updateStats();
        updateBadges();
        showNotification('邮件已恢复');
    }
}

// 批量标记已读
function batchMarkRead() {
    if (selectedEmails.size === 0) {
        showNotification('请先选择邮件', 'error');
        return;
    }
    selectedEmails.forEach(id => {
        const email = emails.find(e => e.id === id);
        if (email) email.read = true;
    });
    selectedEmails.clear();
    selectAll.checked = false;
    renderEmailList();
    updateStats();
    updateBadges();
    showNotification('已标记为已读');
}

// 批量标记未读
function batchMarkUnread() {
    if (selectedEmails.size === 0) {
        showNotification('请先选择邮件', 'error');
        return;
    }
    selectedEmails.forEach(id => {
        const email = emails.find(e => e.id === id);
        if (email) email.read = false;
    });
    selectedEmails.clear();
    selectAll.checked = false;
    renderEmailList();
    updateStats();
    updateBadges();
    showNotification('已标记为未读');
}

// 批量删除
function batchDelete() {
    if (selectedEmails.size === 0) {
        showNotification('请先选择邮件', 'error');
        return;
    }
    if (confirm(`确定要删除选中的 ${selectedEmails.size} 封邮件吗？`)) {
        selectedEmails.forEach(id => {
            const email = emails.find(e => e.id === id);
            if (email) email.status = 'trash';
        });
        selectedEmails.clear();
        selectAll.checked = false;
        renderEmailList();
        updateStats();
        updateBadges();
        showNotification('邮件已移至垃圾箱');
    }
}

// 更新统计信息
function updateStats() {
    const total = emails.filter(e => e.status !== 'trash').length;
    const unread = emails.filter(e => !e.read && e.status !== 'trash').length;
    const important = emails.filter(e => e.important && e.status !== 'trash').length;

    document.getElementById('totalEmails').textContent = total;
    document.getElementById('unreadCount').textContent = unread;
    document.getElementById('importantCount').textContent = important;
}

// 更新徽章
function updateBadges() {
    const all = emails.filter(e => e.status !== 'trash').length;
    const unread = emails.filter(e => !e.read && e.status !== 'trash').length;
    const read = emails.filter(e => e.read && e.status !== 'trash').length;
    const important = emails.filter(e => e.important && e.status !== 'trash').length;
    const sent = emails.filter(e => e.status === 'sent').length;
    const draft = emails.filter(e => e.status === 'draft').length;
    const trash = emails.filter(e => e.status === 'trash').length;

    document.getElementById('badge-all').textContent = all;
    document.getElementById('badge-unread').textContent = unread;
    document.getElementById('badge-read').textContent = read;
    document.getElementById('badge-important').textContent = important;
    document.getElementById('badge-sent').textContent = sent;
    document.getElementById('badge-draft').textContent = draft;
    document.getElementById('badge-trash').textContent = trash;

    // 更新标签计数
    const tags = ['工作', '个人', '项目', '通知'];
    tags.forEach(tag => {
        const count = emails.filter(e => e.tag === tag && e.status !== 'trash').length;
        const tagItem = document.querySelector(`.tag-item[data-tag="${tag}"] .tag-count`);
        if (tagItem) {
            tagItem.textContent = count;
        }
    });
}

// 处理写邮件表单提交
function handleComposeSubmit(e) {
    e.preventDefault();
    
    const recipient = document.getElementById('recipient').value;
    const cc = document.getElementById('cc').value;
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('content').value;
    const tag = document.getElementById('emailTag').value;
    const important = document.getElementById('markImportant').checked;

    // 创建新邮件（模拟发送）
    const newEmail = {
        id: emails.length > 0 ? Math.max(...emails.map(e => e.id)) + 1 : 1,
        sender: '我',
        senderEmail: 'me@example.com',
        subject: subject,
        content: `收件人: ${recipient}${cc ? '\n抄送: ' + cc : ''}\n\n${content}`,
        time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(/\//g, '-'),
        read: false,
        important: important,
        tag: tag || null,
        status: 'sent'
    };

    emails.unshift(newEmail);
    renderEmailList();
    updateStats();
    updateBadges();
    composeModal.style.display = 'none';
    composeForm.reset();
    
    showNotification('邮件已发送！');
    showEmailDetail(newEmail.id);
}

// 保存草稿
function saveDraft() {
    const recipient = document.getElementById('recipient').value;
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('content').value;
    const tag = document.getElementById('emailTag').value;

    if (!subject && !content) {
        showNotification('草稿至少需要主题或内容', 'error');
        return;
    }

    const draftEmail = {
        id: emails.length > 0 ? Math.max(...emails.map(e => e.id)) + 1 : 1,
        sender: '我',
        senderEmail: 'me@example.com',
        subject: subject || '(无主题)',
        content: `收件人: ${recipient || '(未填写)'}\n\n${content || '(草稿内容)'}`,
        time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(/\//g, '-'),
        read: true,
        important: false,
        tag: tag || null,
        status: 'draft'
    };

    emails.unshift(draftEmail);
    renderEmailList();
    updateStats();
    updateBadges();
    composeModal.style.display = 'none';
    composeForm.reset();
    
    showNotification('草稿已保存');
}

// 保存设置
function saveSettings() {
    settings.autoMarkRead = document.getElementById('autoMarkRead').checked;
    settings.showPreview = document.getElementById('showPreview').checked;
    settings.emailsPerPage = parseInt(document.getElementById('emailsPerPage').value);
    settings.emailNotifications = document.getElementById('emailNotifications').checked;
    settings.soundNotifications = document.getElementById('soundNotifications').checked;
    settings.themeColor = document.getElementById('themeColor').value;

    localStorage.setItem('emailSettings', JSON.stringify(settings));
    settingsModal.style.display = 'none';
    showNotification('设置已保存');
}

// 加载设置
function loadSettings() {
    const saved = localStorage.getItem('emailSettings');
    if (saved) {
        settings = JSON.parse(saved);
    }

    document.getElementById('autoMarkRead').checked = settings.autoMarkRead;
    document.getElementById('showPreview').checked = settings.showPreview;
    document.getElementById('emailsPerPage').value = settings.emailsPerPage;
    document.getElementById('emailNotifications').checked = settings.emailNotifications;
    document.getElementById('soundNotifications').checked = settings.soundNotifications;
    document.getElementById('themeColor').value = settings.themeColor;
}

// 显示通知
function showNotification(message, type = 'success') {
    const notificationText = document.getElementById('notificationText');
    notificationText.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 格式化时间
function formatTime(timeString) {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
        return '昨天';
    } else if (days < 7) {
        return `${days}天前`;
    } else {
        return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
    }
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 将函数暴露到全局作用域，以便在 HTML 中调用
window.toggleRead = toggleRead;
window.toggleImportant = toggleImportant;
window.deleteEmail = deleteEmail;
window.restoreEmail = restoreEmail;
