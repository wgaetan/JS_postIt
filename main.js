'use strict';

/**
 * PostIt class store infos about a specific postIt
 * and its method help managing it.
 */
class PostIt {
  /**
   * Constructor for PostIt class
   * @param {number} width - width of the future postIt object
   * @param {number} height - height of the future postIt object
   * @param {string} color - hexadecimal color
   */
  constructor(width, height, color) {
    this.width_ = width;
    this.height_ = height;
    this.color_ = color || '#FFBF00';
    this.posX_ = 10;
    this.posY_ = 60;
    this.dragging_ = false;
    this.mouseOffset_ = {x: 0, y: 0};
    this.domElement_ = document.createElement('div');
  }


  /**
   * Handling user's click on postIt's toolbar.
   * @param {MouseEvent} event - Dom event struct.
   */
  onToolbarClick(event) {
    if (event.button === 0) {
      if (this.dragging_) {
        this.dragging_ = false;
      } else {
        this.dragging_ = true;
        this.mouseOffset_.x = event.clientX - this.posX_;
        this.mouseOffset_.y = event.clientY - this.posY_;
      }
    }
  }

  /**
   * Moving postIT following user's mouse cursor.
   * @param {MouseEvent} event - Dom event struct.
   */
  onToolbarHover(event) {
    if (this.dragging_) {
      this.posX_ = event.clientX - this.mouseOffset_.x;
      this.posY_ = event.clientY - this.mouseOffset_.y;
      this.domElement_.style.left = this.posX_;
      this.domElement_.style.top = this.posY_;
    }
  }

  /**
   * Initialise the postIt DOM element and add it to the DOM.
   */
  init() {
    if (this.width_ < 150) this.width_ = 150;
    if (this.height_ < 150) this.height_ = 150;
    this.domElement_.classList.add('post-it');
    this.domElement_.style.width = this.width_;
    this.domElement_.style.height = this.height_;
    this.domElement_.style.left = '10px';
    this.domElement_.style.top = '60px';
    this.domElement_.style.backgroundColor = this.color_;
    this.addToolBar();
    this.addContentField();
    document.getElementById('pin-board').appendChild(this.domElement_);
  }

  /**
   * Create the content tool bar of the new postIt.
   */
  addToolBar() {
    const toolBar = document.createElement('div');
    const delButton = document.createElement('img');

    delButton.src = './ressources/del_postIt_icon.png';
    delButton.classList.add('del-button');
    delButton.addEventListener('mousedown', this.delete.bind(this));
    toolBar.classList.add('post-it-nav-bar');
    toolBar.addEventListener('mousedown', this.onToolbarClick.bind(this));
    document.addEventListener('mousemove', this.onToolbarHover.bind(this));
    toolBar.appendChild(delButton);
    this.domElement_.appendChild(toolBar);
  }

  /**
   * Create the content field of the new postIt.
   */
  addContentField() {
    const contentField = document.createElement('div');

    contentField.classList.add('post-it-content');
    contentField.contentEditable = 'true';
    this.domElement_.appendChild(contentField);
  }

  /**
   * Delete this postIt from DOM.
   */
  delete() {
    this.domElement_.remove();
  }
}

/**
 * Create a new postIt object
 */
function createPostIt() {
  const newWidth = document.getElementById('width').value;
  const newHeight = document.getElementById('height').value;
  const newPostIt = new PostIt(newWidth, newHeight, '#00a0ef');

  newPostIt.init();
}

document.getElementById('new-post-it-button')
    .addEventListener('mousedown', createPostIt);
