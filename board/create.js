

    (() => {
    const form = document.getElementById('postForm');
    const titleEl = document.getElementById('title');
    const categoryEl = document.getElementById('category');
    const positionsEl = document.getElementById('positions');
    const startDateEl = document.getElementById('startDate');
    const endDateEl = document.getElementById('endDate');
    const descriptionEl = document.getElementById('description');
    const contactMethodEl = document.getElementById('contactMethod');
    const contactInfoEl = document.getElementById('contactInfo');
    const tagsContainer = document.getElementById('tags');
    const tagInput = document.getElementById('tagInput');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const editingIdEl = document.getElementById('editingId');
    const postPreview = document.getElementById('postPreview');


    let tags = [];

    // ---------- 태그 처리 ----------
    function renderTags(){
    // 기존 태그 노드 제거한 뒤 다시 그림 (단, 마지막 input 유지)
    // tagsContainer의 자식들을 지우고 input을 붙임
    tagsContainer.innerHTML = '';
    tags.forEach((t, idx) => {
    const pill = document.createElement('span');
    pill.className = 'tag';
    pill.innerHTML = `${escapeHtml(t)} <span class="remove" data-idx="${idx}">&times;</span>`;
    tagsContainer.appendChild(pill);
});
    tagsContainer.appendChild(tagInput);
    tagInput.value = '';
}

    tagInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ','){
    e.preventDefault();
    const v = tagInput.value.trim();
    if(v && !tags.includes(v)){
    tags.push(v);
    renderTags();
    updatePreview();
}
} else if(e.key === 'Backspace' && tagInput.value === ''){
    // 마지막 태그 삭제
    tags.pop();
    renderTags();
    updatePreview();
}
});

    tagsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove')){
    const idx = Number(e.target.dataset.idx);
    tags.splice(idx,1);
    renderTags();
    updatePreview();
}
});

    function formatDate(d) {
    if(!d) return '-';
    return d;
}
    function escapeHtml(s) {
    return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

    function updatePreview(){
    const title = titleEl.value || '제목이 여기에 표시됩니다';
    const category = categoryEl.value || '-';
    const positions = positionsEl.value || '-';
    const sdate = startDateEl.value ? formatDate(startDateEl.value) : '-';
    const edate = endDateEl.value ? formatDate(endDateEl.value) : '-';
    const desc = descriptionEl.value || '프로젝트 소개 내용이 여기 미리보기에 표시됩니다. 작성하면서 변경사항이 실시간 반영됩니다.';
    const contact = contactMethodEl.value && contactInfoEl.value ? `${contactMethodEl.value}: ${contactInfoEl.value}` : '';

    postPreview.innerHTML = `
          <div class="meta">${escapeHtml(category)} · 모집 ${escapeHtml(String(positions))}명 · 기간 ${escapeHtml(sdate)} ~ ${escapeHtml(edate)}</div>
          <h4>${escapeHtml(title)}</h4>
          <div class="meta">${escapeHtml(contact)}</div>
          <p>${escapeHtml(desc)}</p>
          ${tags.length ? `<div style="margin-top:10px;">${tags.map(t => `<span class="tag" style="background:#f0f8ff;color:#1e60ff;margin-right:6px;padding:6px 8px">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
        `;
}

    // 실시간 업데이트 바인딩
    [titleEl, categoryEl, positionsEl, startDateEl, endDateEl, descriptionEl, contactMethodEl, contactInfoEl].forEach(el=>{
    el.addEventListener('input', updatePreview);
});


    // ---------- 폼 초기화 ----------
    function resetForm(){
    form.reset();
    tags = [];
    renderTags();
    editingIdEl.value = '';
    submitBtn.textContent = '등록';
    cancelBtn.style.display = 'none';
    document.getElementById('formTitle').textContent = '팀원 모집 글 작성';
    updatePreview();
}



    // 초기 세팅
    resetForm();
    renderPosts();
    updatePreview();


})();
