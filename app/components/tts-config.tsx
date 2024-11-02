import { TTSConfig, TTSConfigValidator } from "../store";

import Locale from "../locales";
import { ListItem } from "./ui-lib";
import {
  DEFAULT_TTS_ENGINE,
  DEFAULT_TTS_ENGINES,
  DEFAULT_TTS_MODELS,
  DEFAULT_TTS_VOICES,
} from "../constant";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function TTSConfigList(props: {
  ttsConfig: TTSConfig;
  updateConfig: (updater: (config: TTSConfig) => void) => void;
}) {
  return (
    <>
      <ListItem
        title={Locale.Settings.TTS.Enable.Title}
        subTitle={Locale.Settings.TTS.Enable.SubTitle}
      >
        {/* <input
          type="checkbox"
          checked={props.ttsConfig.enable}
          onChange={(e) =>
            props.updateConfig(
              (config) => (config.enable = e.currentTarget.checked),
            )
          }
        ></input> */}
        <Checkbox
          checked={props.ttsConfig.enable}
          onCheckedChange={(e) =>
            props.updateConfig(
              (config) => (config.enable = Boolean(e.valueOf())),
            )
          }
        />
      </ListItem>
      {/* <ListItem
        title={Locale.Settings.TTS.Autoplay.Title}
        subTitle={Locale.Settings.TTS.Autoplay.SubTitle}
      >
        <input
          type="checkbox"
          checked={props.ttsConfig.autoplay}
          onChange={(e) =>
            props.updateConfig(
              (config) => (config.autoplay = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem> */}
      <ListItem title={Locale.Settings.TTS.Engine}>
        {/* <Select
          value={props.ttsConfig.engine}
          onChange={(e) => {
            props.updateConfig(
              (config) =>
                (config.engine = TTSConfigValidator.engine(
                  e.currentTarget.value,
                )),
            );
          }}
        >
          {DEFAULT_TTS_ENGINES.map((v, i) => (
            <option value={v} key={i}>
              {v}
            </option>
          ))}
        </Select> */}
        <Select
          onValueChange={(value) => {
            props.updateConfig(
              (config) => (config.engine = TTSConfigValidator.engine(value)),
            );
          }}
          defaultValue={props.ttsConfig.engine}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select engine" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {DEFAULT_TTS_ENGINES.map((v, i) => (
                <SelectItem key={i} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ListItem>
      {props.ttsConfig.engine === DEFAULT_TTS_ENGINE && (
        <>
          <ListItem title={Locale.Settings.TTS.Model}>
            {/* <Select
              value={props.ttsConfig.model}
              onChange={(e) => {
                props.updateConfig(
                  (config) =>
                    (config.model = TTSConfigValidator.model(
                      e.currentTarget.value,
                    )),
                );
              }}
            >
              {DEFAULT_TTS_MODELS.map((v, i) => (
                <option value={v} key={i}>
                  {v}
                </option>
              ))}
            </Select> */}
            <Select
              onValueChange={(value) => {
                props.updateConfig(
                  (config) => (config.model = TTSConfigValidator.model(value)),
                );
              }}
              defaultValue={props.ttsConfig.model}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {DEFAULT_TTS_MODELS.map((v, i) => (
                    <SelectItem key={i} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ListItem>
          <ListItem
            title={Locale.Settings.TTS.Voice.Title}
            subTitle={Locale.Settings.TTS.Voice.SubTitle}
          >
            {/* <Select
              value={props.ttsConfig.voice}
              onChange={(e) => {
                props.updateConfig(
                  (config) =>
                    (config.voice = TTSConfigValidator.voice(
                      e.currentTarget.value,
                    )),
                );
              }}
            >
              {DEFAULT_TTS_VOICES.map((v, i) => (
                <option value={v} key={i}>
                  {v}
                </option>
              ))}
            </Select> */}
            <Select
              onValueChange={(value) => {
                props.updateConfig(
                  (config) => (config.voice = TTSConfigValidator.voice(value)),
                );
              }}
              defaultValue={props.ttsConfig.voice}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {DEFAULT_TTS_VOICES.map((v, i) => (
                    <SelectItem key={i} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ListItem>
          <ListItem
            title={Locale.Settings.TTS.Speed.Title}
            subTitle={Locale.Settings.TTS.Speed.SubTitle}
          >
            {/* <InputRange
              aria={Locale.Settings.TTS.Speed.Title}
              value={props.ttsConfig.speed?.toFixed(1)}
              min="0.3"
              max="4.0"
              step="0.1"
              onChange={(e) => {
                props.updateConfig(
                  (config) =>
                    (config.speed = TTSConfigValidator.speed(
                      e.currentTarget.valueAsNumber,
                    )),
                );
              }}
            ></InputRange> */}
            <Slider
              defaultValue={[props.ttsConfig.speed.toFixed(1) as any]}
              min={0.5}
              max={3}
              step={0.5}
              aria-label={Locale.Settings.TTS.Speed.Title}
              className="max-w-[40%]"
              onValueChange={(value) => {
                props.updateConfig(
                  (config) =>
                    (config.speed = TTSConfigValidator.speed(
                      value.at(0) as number,
                    )),
                );
              }}
            />
          </ListItem>
        </>
      )}
    </>
  );
}
