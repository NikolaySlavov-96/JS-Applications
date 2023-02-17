export function contentHomeViewGetPost(data) {
    const parentDiv = createElem('div', 'topic-container');
    const topicDiv = createElem('div', 'topic-name-wrapper');

    const topicDivName = createElem('div', 'topic-name', '', data._id);
    const aTag = createElem('a', 'normal');
    aTag.appendChild(createElem('h2', '', data.topicName)); // ?
    topicDivName.appendChild(aTag);
    
    const divColum = createElem('div', 'columns');
    const divOthD = createElem('div');
    const pData = createElem('p', '', 'Data: ')
    pData.appendChild(createElem('time', '', data.currentData));
    divOthD.appendChild(pData);
    const divNickName = createElem('div', 'nick-name');
    const pUsername = createElem('p', '', 'Username: ');
    pUsername.appendChild(createElem('span', '', data.username))
    divNickName.appendChild(pUsername);
    divOthD.appendChild(divNickName);
    divColum.appendChild(divOthD)

    topicDivName.appendChild(divColum);
    topicDiv.appendChild(topicDivName);
    parentDiv.appendChild(topicDiv);

    return parentDiv;
}

export function contentPostViewTitle(data) {

    const themeNameWrapper = createElem('div', 'theme-name-wrapper');
    const divThemeName = createElem('div', 'theme-name');
    divThemeName.appendChild(createElem('h2', '', data.topicName));
    themeNameWrapper.appendChild(divThemeName);

    return themeNameWrapper;
}

export function contentPostViewComment(data) {
    const divHeader = createElem('div', 'header')
    divHeader.appendChild(createElem('img'))
    const pSpan = createElem('p');
    pSpan.appendChild(createElem('span', '', data.username));
    // pSpan.textContent = ' posted on ';
    pSpan.appendChild(createElem('time', '', data.currentData)) // add time
    divHeader.appendChild(pSpan);

    divHeader.appendChild(createElem('p', 'post-content', data.postText));
    return divHeader;
}

export function contentPostViewUserCommen(data) {
    const divUserComment = createElem('div', 'user-comment');
    const divTopicNameWraper = createElem('div', 'topic-name-wrapper')
    const divTopicName = createElem('div', 'topic-name');
    const pName = createElem('p');
    pName.appendChild(createElem('strong', '', data.username));
    // pName.textContent = 'commented on ';
    pName.appendChild(createElem('time', '', data.currentData));
    divTopicName.appendChild(pName);

    const divPostContent = createElem('div', 'post-content');
    divPostContent.appendChild(createElem('p', '', data.postText));
    divTopicName.appendChild(divPostContent);
    divTopicNameWraper.appendChild(divTopicName);
    divUserComment.appendChild(divTopicNameWraper);

    return divUserComment;
}

function createElem(typeEl, classN, content, idI) {

    const part = document.createElement(typeEl);

    if(typeEl == 'a') {
        part.href='#';
    }

    if(typeEl === 'img') {
        part.src = './static/profile.png';
        part.alt = 'avatar';
    }

    if(typeEl == 'p' && content !== '' && content !== undefined) {
        part.textContent = content;
    }
    
    if(classN !== '' && classN !== undefined) {
        part.classList.add(classN);
    }

    if(content !== '' && content !== undefined) {
        part.textContent = content;
    }

    if(idI !== '' && idI !== undefined) {
        part.id = idI;
    }

    

    return part;
}
