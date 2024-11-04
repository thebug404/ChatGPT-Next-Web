import styles from "./auth.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path, SAAS_CHAT_URL } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";
import Delete from "../icons/close.svg";
import Arrow from "../icons/arrow.svg";
import Logo from "../icons/logo.svg";
import { useMobileScreen } from "@/app/utils";
import { getClientConfig } from "../config/client";
import { safeLocalStorage } from "@/app/utils";
import {
  trackSettingsPageGuideToCPaymentClick,
  trackAuthorizationPageButtonToCPaymentClick,
} from "../utils/auth-settings-events";
import { Button } from "@/components/ui/button";
import { BrainCircuit, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const storage = safeLocalStorage();

export function AuthPage() {
  const navigate = useNavigate();
  const accessStore = useAccessStore();
  const goHome = () => navigate(Path.Home);
  const goChat = () => navigate(Path.Chat);
  const goSaas = () => {
    trackAuthorizationPageButtonToCPaymentClick();
    window.location.href = SAAS_CHAT_URL;
  };

  const resetAccessCode = () => {
    accessStore.update((access) => {
      access.openaiApiKey = "";
      access.accessCode = "";
    });
  }; // Reset access code to empty string

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-full">
      {/* <TopBanner></TopBanner> */}
      <CardHeader className="flex-row">
        {/* <IconButton
          icon={<LeftIcon />}
          text={Locale.Auth.Return}
          onClick={() => navigate(Path.Home)}
        ></IconButton> */}
        <Button
          className="w-auto"
          variant="ghost"
          onClick={() => navigate(Path.Home)}
        >
          <ChevronLeft />
          {Locale.Auth.Return}
        </Button>
      </CardHeader>

      <CardContent className="text-center">
        <div className="flex justify-center mb-5">
          <figure className="flex items-center justify-center h-[70px] w-[70px] rounded-full border-2 border-white p-4">
            <BrainCircuit size={60} />
          </figure>
        </div>

        {/* <div className={styles["auth-title"]}>{Locale.Auth.Title}</div> */}
        <h1 className="text-3xl">{Locale.Auth.Title}</h1>
        {/* <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div> */}
        <p className="text-md text-muted-foreground">{Locale.Auth.Tips}</p>

        {/* <input
          className={styles["auth-input"]}
          type="password"
          placeholder={Locale.Auth.Input}
          value={accessStore.accessCode}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.accessCode = e.currentTarget.value),
            );
          }}
        /> */}
        <Input
          type="password"
          placeholder={Locale.Auth.Input}
          value={accessStore.accessCode}
          className="mx-auto dark:bg-muted w-full sm:max-w-[400px] mt-5 mb-4"
          onChange={(e) => {
            accessStore.update(
              (access) => (access.accessCode = e.currentTarget.value),
            );
          }}
        />
        {/* {!accessStore.hideUserApiKey ? (
          <>
            <div className={styles["auth-tips"]}>{Locale.Auth.SubTips}</div>
            <input
              className={styles["auth-input"]}
              type="password"
              placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
              value={accessStore.openaiApiKey}
              onChange={(e) => {
                accessStore.update(
                  (access) => (access.openaiApiKey = e.currentTarget.value),
                );
              }}
            />
            <input
              className={styles["auth-input-second"]}
              type="password"
              placeholder={Locale.Settings.Access.Google.ApiKey.Placeholder}
              value={accessStore.googleApiKey}
              onChange={(e) => {
                accessStore.update(
                  (access) => (access.googleApiKey = e.currentTarget.value),
                );
              }}
            />
          </>
        ) : null} */}

        <div>
          {/* <IconButton
            text={Locale.Auth.Confirm}
            type="primary"
            onClick={goChat}
          /> */}
          <Button className="w-full sm:max-w-[400px]" onClick={goChat}>
            {Locale.Auth.Confirm}
          </Button>
          {/* <IconButton
            text={Locale.Auth.SaasTips}
            onClick={() => {
              goSaas();
            }}
          /> */}
        </div>
      </CardContent>
    </Card>
  );
}

function TopBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useMobileScreen();
  useEffect(() => {
    // 检查 localStorage 中是否有标记
    const bannerDismissed = storage.getItem("bannerDismissed");
    // 如果标记不存在，存储默认值并显示横幅
    if (!bannerDismissed) {
      storage.setItem("bannerDismissed", "false");
      setIsVisible(true); // 显示横幅
    } else if (bannerDismissed === "true") {
      // 如果标记为 "true"，则隐藏横幅
      setIsVisible(false);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    storage.setItem("bannerDismissed", "true");
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div
      className={styles["top-banner"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles["top-banner-inner"]} no-dark`}>
        <Logo className={styles["top-banner-logo"]}></Logo>
        <span>
          {Locale.Auth.TopTips}
          <a
            href={SAAS_CHAT_URL}
            rel="stylesheet"
            onClick={() => {
              trackSettingsPageGuideToCPaymentClick();
            }}
          >
            {Locale.Settings.Access.SaasStart.ChatNow}
            <Arrow style={{ marginLeft: "4px" }} />
          </a>
        </span>
      </div>
      {(isHovered || isMobile) && (
        <Delete className={styles["top-banner-close"]} onClick={handleClose} />
      )}
    </div>
  );
}
