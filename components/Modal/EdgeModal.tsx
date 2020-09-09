import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';

import Button from '@material-ui/core/Button';

import RenderedImage from '../RenderedImage';

import { COLORS } from '../../defines';

import IndexContext from '../../IndexContext';

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #eee;
  z-index: 4;

  .blurBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5) no-repeat padding-box;
    -webkit-backdrop--filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 3;
  }

  .modalBox {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 280px;
    height: 280px;
    border-radius: 10px;
    background-color: white;
    z-index: 5;
    .top {
      height: 80px;
      background-color: #d7dede;
      border-radius: 10px 10px 0 0;
    }
    .bottom {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      .grow {
        flex-grow: 1;
      }
      & > p {
        margin: 0;
      }
      .situation {
        color: #686868;
        font-size: 0.75rem;
        font-weight: bolder;
        margin-bottom: 5px;
      }
      .question {
        font-weight: bolder;
      }
      .exitButton {
        border-radius: 5px !important;
        background-color: ${COLORS.primary} !important;
        margin-bottom: 5px;
        span {
          color: white !important;
          font-size: 0.9rem;
        }
      }
      .goFirst {
        span {
          text-decoration: underline;
          font-size: 0.75rem;
          font-weight: bolder;
        }
      }
    }
  }

  &.withLayout {
    .modalBox {
      width: 440px;
      height: 440px;
      .top {
        height: 130px;
      }
      .bottom {
        height: 310px;
        padding: 40px 0;
        .situation {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }
        .question {
          font-size: 1.4rem;
        }
        .exitButton {
          margin-bottom: 15px;
          span {
            font-size: 1.2rem;
          }
        }
        .goFirst {
          span {
            font-size: 1rem;
          }
        }
      }
    }
  }
`;

const Background = styled(RenderedImage)`
  position: absolute;
  z-index: -1;
`;

interface Props {
  className?: string | undefined;
}
const EdgeModal: React.FC<Props> = ({ className, ...props }) => {
  const router = useRouter();
  const { refSlider, setIndex, withLayout } = React.useContext(IndexContext);

  return (
    <Root className={`${className} ${withLayout && 'withLayout'}`} {...props}>
      <ScrollLock />
      <div className="modalBox">
        <div className="top" />
        <div className="bottom">
          <p className="situation">마지막 작품까지 보셨어요</p>
          <p className="question">전시를 다시 감상하실래요?</p>
          <div className="grow" />
          <Link href="/visitor">
            <Button className="exitButton">전시장 나가기</Button>
          </Link>
          <Button
            className="goFirst"
            onClick={() => {
              setIndex(1);
              sessionStorage.setItem('@artistId', '1');
              refSlider.current?.slickGoTo(0);
              if (!withLayout) {
                setTimeout(() => router.reload(), 10);
              }
            }}
          >
            1번 작품부터 다시보기
          </Button>
        </div>
      </div>
      <Background />
      <div className="blurBackground" />
    </Root>
  );
};

export default EdgeModal;
