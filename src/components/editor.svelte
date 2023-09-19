<script>
  // import icon_codeBlock from "$lib/code-block.svg"
  // import icon_text from '../../public/text-t.svg'
  // import icon_image from '../../public/images.svg'
  // import icon_arrow from '../../public/arrow-up-right.svg'
</script>

<div class="editor">
  <div class="toolbar">
    <div class="toolbar-group toolbar-left">
      <div class="toolbar-menu-btn toolbar-menu-">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 0 256 256"
          ><path
            d="M58.34,101.66l-32-32a8,8,0,0,1,0-11.32l32-32A8,8,0,0,1,69.66,37.66L43.31,64,69.66,90.34a8,8,0,0,1-11.32,11.32Zm40,0a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0,0-11.32l-32-32A8,8,0,0,0,98.34,37.66L124.69,64,98.34,90.34A8,8,0,0,0,98.34,101.66ZM200,40H176a8,8,0,0,0,0,16h24V200H56V136a8,8,0,0,0-16,0v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Z"
          /></svg
        >
      </div>
      <div class="toolbar-menu-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 0 256 256"
          ><path
            d="M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z"
          /></svg
        >
      </div>
      <div class="toolbar-menu-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 0 256 256"
          ><path
            d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
          /></svg
        >
      </div>
      <div class="toolbar-menu-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 0 256 256"
          ><path
            d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"
          /></svg
        >
      </div>
    </div>
    <div class="toolbar-group toolbar-center">Untitled Document</div>
    <div class="toolbar-group toolbar-right">
      <button class="toolbar-control-menu btn btn-export"> Export </button>
      <button class="toolbar-control-menu btn btn-share"> Share </button>
      <div class="toolbar-control-menu zoom">
        <div>100%</div>
      </div>
    </div>
  </div>
  <div class="field">
    <div class="sidebar sidebar-elements">
      <div class="sb-title">Elements</div>
    </div>
    <div class="workspace" />
    <div class="sidebar sidebar-properties">
      <div class="sb-title">Properties</div>
    </div>
  </div>
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    background: white;
    margin: 0;
  }

  .toolbar {
    /* position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background: #2c2c2c;
    color: white; */
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    /* user-select: none; */
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    z-index: 8;
    background-color: var(--bg-toolbar);
    border-bottom: 1px solid var(--color-conditionalborder);
    box-sizing: border-box;
  }

  .toolbar-group {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .toolbar-left {
    justify-content: flex-start;
    position: relative;
    flex-basis: 30%;
    opacity: 1;
    transition: opacity 0.3s;
    background-color: #2c2c2c;
    color: white;
  }

  .toolbar-menu-btn {
    height: 32px;
    width: 32px;
    padding: 8px;
    border: 0px;
  }

  .toolbar-menu-btn:hover {
    background-color: black;
    cursor: pointer;
  }

  .toolbar-center {
    flex-basis: 40%;
    justify-content: center;
    /* pointer-events: none; */
    background-color: #2c2c2c;
    color: white;
  }

  .toolbar-right {
    display: flex;
    gap: 8px;
    padding-right: 8px;
    justify-content: flex-end;
    flex-basis: 30%;
    opacity: 1;
    transition: opacity 0.3s;
    background-color: #2c2c2c;
    color: white;
  }

  .toolbar-control-menu {
    /* height: 32px; */
    /* width: 64px; */
    padding: 8px;
    border: 0px;
  }

  .zoom {
    font-size: 18px;
    height: 32px;
    padding: 8px;
    border: 0px;
    text-align: center;
  }

  .zoom:hover {
    background-color: black;
    cursor: pointer;
  }

  .btn {
    font-size: 18px;
    padding: 8px;
    border-radius: 8px;
    border: 0px;
  }

  .btn-export {
    color: white;
    background: #0d99ff;
  }

  .btn:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }

  .btn-share {
    color: white;
    background: #0be42b;
  }

  .field {
    display: flex;
    flex-direction: row;
  }

  .sidebar {
    background: #2c2c2c;
    width: 240px;
    position: absolute;
    height: 100%;
    top: 48px;
    /* bottom: 0; */
    /* overflow-y: auto; */
    overflow: hidden;
    scrollbar-width: none;
  }

  .sidebar-properties {
    right: 0;
  }

  .sidebar-elements {
    left: 0;
  }

  .sb-title {
    color: white;
    font-size: 28px;
    text-align: center;
    padding: 16px 0 16px 0;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
  }

  .workspace {
    width: 1440px;
    height: 900px;
  }
</style>
