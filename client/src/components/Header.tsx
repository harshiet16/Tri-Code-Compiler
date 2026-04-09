import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useLogoutMutation } from "@/redux/slices/api";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { updateIsOwner } from "@/redux/slices/compilerSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [logout, { isLoading }] = useLogoutMutation();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const windowWidth = useSelector(
    (state: RootState) => state.appSlice.windowWidth
  );
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(updateIsOwner(false));
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  }

  const handleCloseSheet = () => {
    setSheetOpen(false);
  };

  return (
    <nav className="w-full h-[60px] glassmorphism sticky top-0 z-50 text-foreground p-3 flex justify-between items-center shadow-lg">
      <Link to="/" className="transition-transform hover:scale-110 active:scale-95">
        <h2 className="font-bold select-none text-primary text-xl tracking-tighter">TriCode <span className="text-foreground">Compiler</span></h2>
      </Link>
      {windowWidth > 640 ? (
        <ul className="flex gap-2">
          <li>
            <Button
              variant="blue"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </li>
          <li>
            <Link to="/compiler">
              <Button variant="link">Compiler</Button>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/all-codes">
                  <Button variant="link">All Codes</Button>
                </Link>
              </li>
              <li>
                <Link to="/my-codes">
                  <Button variant="blue">My Codes</Button>
                </Link>
              </li>
              <li>
                <Button
                  loading={isLoading}
                  onClick={handleLogout}
                  variant="destructive"
                >
                  Logout
                </Button>
              </li>
              <li>
                <Avatar>
                  <AvatarImage src={currentUser.picture} />
                  <AvatarFallback className="capitalize">
                    {currentUser.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <Button variant="blue">Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button variant="blue">Signup</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      ) : (
        <div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <GiHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <ul className="flex gap-2 flex-col py-5">
                <li>
                  <Button
                    variant="blue"
                    className="w-full justify-between"
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      handleCloseSheet();
                    }}
                  >
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>
                </li>
                <li>
                  <Link to="/compiler">
                    <Button
                      onClick={handleCloseSheet}
                      className="w-full"
                      variant="link"
                    >
                      Compiler
                    </Button>
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/all-codes">
                        <Button
                          onClick={handleCloseSheet}
                          className="w-full"
                          variant="link"
                        >
                          All Codes
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-codes">
                        <Button
                          onClick={handleCloseSheet}
                          className="w-full"
                          variant="blue"
                        >
                          My Codes
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Button
                        loading={isLoading}
                        onClick={async () => {
                          await handleLogout();
                          handleCloseSheet();
                        }}
                        variant="destructive"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <Button onClick={handleCloseSheet} className="w-full" variant="blue">
                          Login
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                        <Button onClick={handleCloseSheet} className="w-full" variant="blue">
                          Signup
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </nav>
  );
}
