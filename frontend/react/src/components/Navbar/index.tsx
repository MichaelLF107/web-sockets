import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";

type NavbarProps = {
  roomList: string[];
  listRooms: () => void;
  createRoom: () => void;
  selectRoom: (room: string) => void;
};

export default function Navbar({
  roomList,
  listRooms,
  createRoom,
  selectRoom,
}: NavbarProps) {
  const [showRoomList, setShowRoomList] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRoomList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  function openRoomList() {
    if (!showRoomList) {
      listRooms();
      setShowRoomList(true);
    } else {
      setShowRoomList(false);
    }
  }

  function handleSelectRoom(room: string) {
    selectRoom(room);
    setShowRoomList(false);
  }

  return (
    <nav className={styles.navbar}>
      <button className={styles.dropdownButton} onClick={openRoomList}>
        Rooms
        {showRoomList ? "▲" : "▼"}
      </button>
      <button onClick={createRoom}>Create Room</button>
      {showRoomList && (
        <div className={styles.dropdown} ref={dropdownRef}>
          {roomList.map((room, index) => (
            <React.Fragment key={index}>
              <div className={styles.room}>
                {room}
                <button
                  onClick={() => handleSelectRoom(room)}
                  className={styles.joinButton}
                >
                  Join
                </button>
              </div>
              {index !== roomList.length - 1 && <hr className={styles.hr} />}
            </React.Fragment>
          ))}
          {roomList.length === 0 && <p>No rooms available</p>}
        </div>
      )}
    </nav>
  );
}
