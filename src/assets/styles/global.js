import { createGlobalStyle } from 'antd-style'
const Global = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    overflow: hidden;
  }

  li {
    list-style: none;
  }
  //  ====== 容器部分 ======
  .page{
    background: ${(p) => p.theme.colorBgContainer};
    width: 100vw;
    height: 100vh;
  }

  .flexBox {
    display: flex;
  }

  .felex-center{
    display: flex;
    jusityfyContent: center;
    alignItems: center
  }
  .flex-1 {
    flex: 1;
    width: 100%;
    height: 100%;
  }
  .flex {
    display: flex;
    &-sb {
      display: flex;
      justify-content: space-between;
      &--center {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    &-sa {
      display: flex;
      justify-content: space-around;
    }
  }
  
  .flex-space-between {
    display: flex;
    justify-content: space-between;
  }
  
  .flex-align-center {
    display: flex;
    align-items: center;
  }

  .test {
    background: pink;
    color: pink;
    // 添加媒体查询
    @media (max-width: 768px): {
      background: lightblue// 在小屏幕上使用不同的背景色
    };
    @media (min-width: 769px) and (max-width: 1024px): {
      background: lightgreen; // 在中等屏幕上使用不同的背景色
    }
  }

  .container {
    width: 100%;
    height: 100%;
    boxSizing: border-box;
    background: ${(p) => p.theme.colorBgContainer};
  }

  .ant-custom-button {
    color: ${(p) => p.theme.colorPrimary};
    background: ${(p) => p.theme.colorPrimaryBg};
    height: ${(p) => p.theme.controlHeight}px;
    border-radius: ${(p) => p.theme.borderRadius}px;
    padding: 0 ${(p) => p.theme.paddingContentHorizontal}px;

    :hover {
      background: ${(p) => p.theme.colorPrimaryBgHover};
      color: ${(p) => p.theme.colorPrimaryTextActive};
    }

    :active {
      background: ${(p) => p.theme.colorPrimaryBorder};
      color: ${(p) => p.theme.colorPrimaryText};
    }

    border: none;
    cursor: pointer;
  }
  
  .cursor-pointer {
    cursor: pointer;
  }
  // ====== 边距部分 ======
  .pd {
    padding: ${(p) => p.theme.padding}px
  }
  .mg {
    madgin: ${(p) => p.theme.margin}px 
  }
  .mt {
    margin-top: ${(p) => p.theme.margin}px
  }
  
  .hover-placeholder {
    height: 40px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease; /* 平滑过渡效果 */
    border-radius: ${(p) => p.theme.borderRadius}px;
  }

  .hover-placeholder:hover {
    background-color: ${(p) => p.theme.colorBgTextHover}; /* 悬停时的背景颜色 */
  }

  // ====== 大小部分 ======
  .w100-h100 {
    width: 100%;
    height: 100%;
  }
  .w100 {
    width: 100%;
  }
  .h100 {
    height: 100%;
  }
  // ====== 色彩部分 ======
  .box-shadow {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }

  // ====== 媒体查询部分 ======
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      &_right {
        margin-top: 10px;
      }
    };
  }
  @media (max-width: 768px) {
    .media-box {
      display: flex;
      flex-direction: column;
      background: pink;
    } 
  };
  @media (min-width: 769px) and (max-width: 1024px){
     .media-box {
      display: flex;
      flex-direction: column;
      background: pink;
    } 
  }
`

export default Global
