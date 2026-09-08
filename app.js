const cases = [
  {
    id: 'cafe', category: '01 / 咖啡门店 · 设计示例', title: '把周末留给一杯咖啡',
    summary: '面向社区咖啡店的日常种草内容，把「来坐一会儿」变成一个具体、可感受的场景。',
    design: '深绿与奶油色建立安静的氛围，咖啡照片承担情绪，大标题只讲一个主题。适合用在门店日常、周末探店与生活方式分享。',
    copyTitle: '周末不用排满，留一点时间给咖啡。',
    copy: '这一周，已经认真赶过很多路了。\n\n周末就让脚步慢一点。找个舒服的位置，点一杯喜欢的咖啡，把手机放到一边。\n\n看看窗外，翻几页书，或者什么也不做。那些暂时没想明白的事，可以等喝完这杯再说。\n\n你理想的周末，是出门走走，还是找个角落放空？',
    tags: '#咖啡日常 #周末去哪儿 #生活里的小美好',
    outline: ['封面：一句话说出周末氛围。', '环境页：展示座位、光线与空间细节。', '产品页：介绍主推咖啡与真实口味。', '收尾页：补充实际店址、营业时间与到店提示。'],
    alt: '深绿与奶油色咖啡店示例封面：把周末留给一杯咖啡'
  },
  {
    id: 'bakery', category: '02 / 甜品烘焙 · 设计示例', title: '今天的快乐是草莓给的',
    summary: '面向独立甜品店的产品内容，用草莓蛋糕做视觉主角，给「想吃一点甜」一个温柔的理由。',
    design: '樱桃红呼应草莓，奶油色留白托住产品。标题带一点情绪，画面减少干扰，把注意力放在蛋糕的质感与细节。',
    copyTitle: '今天的小奖励，是一块草莓蛋糕。',
    copy: '有时候，快乐不用安排得太复杂。\n\n一颗红红的草莓，一块切得刚好的蛋糕，一段可以慢慢吃甜点的时间，就足够让普通的一天多一点期待。\n\n留一块甜，给认真生活的自己。也可以分一半，给那个想一起喝下午茶的人。\n\n如果今天可以选一份甜点，你会把这块草莓蛋糕留给谁？',
    tags: '#草莓蛋糕 #下午茶 #今日份小确幸',
    outline: ['封面：完整产品与一个情绪主题。', '细节页：展示草莓、切面与蛋糕层次。', '场景页：呈现下午茶或分享时刻。', '收尾页：补充实际规格、价格与预订方式。'],
    alt: '樱桃红草莓蛋糕示例封面：今天的快乐是草莓给的'
  },
  {
    id: 'creator', category: '03 / 个人 IP · 设计示例', title: '小红书新手，第一篇发什么？',
    summary: '面向刚开始分享的个人创作者，用一个具体问题串起三个选题方向，展示知识类内容的组织方式。',
    design: '蓝黄对比突出问题，短句与序号帮助阅读。封面只负责提出问题，内页再按「方向＋例子」逐一展开。',
    copyTitle: '第一篇笔记，可以从你已经知道的事开始。',
    copy: '如果还没想好第一篇写什么，先试着回答下面三个问题。\n\n01 经验分享\n最近做过哪件事，有一点心得想告诉别人？比如：第一次做手冲，我调整了哪三个步骤。\n\n02 问题解答\n别人经常问你什么？挑一个具体问题，用自己的经验认真回答。\n\n03 过程记录\n你正在学习或尝试什么？记录起点、做法和发现，不必等到很厉害才开始。\n\n从一个小问题写起，把一件事讲清楚，就是一个起点。',
    tags: '#个人成长 #内容创作 #新手博主',
    outline: ['封面：提出「第一篇发什么」的问题。', '方向一：经验分享，附一个具体选题。', '方向二：问题解答，附一个问答示范。', '方向三：过程记录，附一个记录结构。', '收尾页：邀请读者写下自己的第一个选题。'],
    alt: '蓝黄知识清单示例封面：小红书新手第一篇发什么'
  }
];

// Remove offline caches left by the site's previous project on this domain.
// This runs only in browsers that have visited the old installation.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      const hadOldWorker = registrations.length > 0 || Boolean(navigator.serviceWorker.controller);
      await Promise.all(registrations.map(registration => registration.unregister()));
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
      }
      if (hadOldWorker && !sessionStorage.getItem('old-site-cache-cleared')) {
        sessionStorage.setItem('old-site-cache-cleared', '1');
        window.location.reload();
      }
    } catch (error) {
      console.warn('Unable to clear an earlier site cache.', error);
    }
  });
}

const dialog = document.querySelector('#case-dialog');
let selectedCase = 0;
let triggerElement = null;
function renderCase(index) {
  selectedCase = (index + cases.length) % cases.length;
  const item = cases[selectedCase];
  const values = {'case-counter': `设计示例 ${selectedCase + 1} / ${cases.length}`, 'case-category': item.category, 'case-title': item.title, 'case-summary': item.summary, 'case-design': item.design, 'case-copy-title': item.copyTitle, 'case-copy': item.copy, 'case-tags': item.tags};
  for (const [id, value] of Object.entries(values)) document.getElementById(id).textContent = value;
  const image = document.querySelector('#case-image');
  image.src = `assets/${item.id}-cover.png`;
  image.alt = item.alt;
  const download = document.querySelector('#case-download');
  download.href = image.getAttribute('src');
  download.download = `心安之地-${item.id}-设计示例.png`;
  const outline = document.querySelector('#case-outline');
  outline.replaceChildren(...item.outline.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  dialog.scrollTop = 0;
}
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  triggerElement = button;
  renderCase(cases.findIndex(item => item.id === button.dataset.case));
  dialog.showModal();
  document.body.classList.add('dialog-open');
  document.querySelector('#close-dialog').focus({preventScroll:true});
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#previous-case').addEventListener('click', () => renderCase(selectedCase - 1));
document.querySelector('#next-case').addEventListener('click', () => renderCase(selectedCase + 1));
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (triggerElement) triggerElement.focus({preventScroll:true});
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); renderCase(selectedCase + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); renderCase(selectedCase - 1); }
});
