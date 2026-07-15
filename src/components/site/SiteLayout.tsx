import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

import { ChatAssistant } from "./ChatAssistant";
import { SoundModal } from "./SoundModal";
import { SoundToggle } from "./SoundToggle";
import { CustomCursor } from "../ui/CustomCursor";
import { startUxTracker } from "@/lib/uxTracker";
import { useMooviaPlayer } from "@/hooks/useMooviaPlayer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const player = useMooviaPlayer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    startUxTracker();
  }, []);

  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Nav />
      <main className="relative z-10 overflow-x-clip">{children}</main>
      <Footer />
      
      <ChatAssistant />
      {player.buttonEnabled && player.tracks.length > 0 && (
        <>
          <SoundModal
            open={player.showModal}
            onGrant={player.grantPermission}
            onDeny={player.denyPermission}
          />
          {player.hasPermission && (
            <SoundToggle
              isPlaying={player.isPlaying}
              currentTrackTitle={player.currentTrack.title}
              onToggle={player.togglePlay}
            />
          )}
        </>
      )}
    </>
  );
}



