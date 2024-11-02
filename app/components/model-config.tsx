import { ServiceProvider } from "@/app/constant";
import { ModalConfigValidator, ModelConfig } from "../store";

import Locale from "../locales";
import { ListItem } from "./ui-lib";
import { useAllModels } from "../utils/hooks";
import { groupBy } from "lodash-es";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function ModelConfigList(props: {
  modelConfig: ModelConfig;
  updateConfig: (updater: (config: ModelConfig) => void) => void;
}) {
  const allModels = useAllModels();
  const groupModels = groupBy(
    allModels.filter((v) => v.available),
    "provider.providerName",
  );
  const value = `${props.modelConfig.model}@${props.modelConfig?.providerName}`;
  const compressModelValue = `${props.modelConfig.compressModel}@${props.modelConfig?.compressProviderName}`;

  return (
    <>
      <ListItem title={Locale.Settings.Model}>
        {/* <Select
          aria-label={Locale.Settings.Model}
          value={value}
          align="left"
          onChange={(e) => {
            const [model, providerName] = e.currentTarget.value.split("@");
            props.updateConfig((config) => {
              config.model = ModalConfigValidator.model(model);
              config.providerName = providerName as ServiceProvider;
            });
          }}
        >
          {Object.keys(groupModels).map((providerName, index) => (
            <optgroup label={providerName} key={index}>
              {groupModels[providerName].map((v, i) => (
                <option value={`${v.name}@${v.provider?.providerName}`} key={i}>
                  {v.displayName}
                </option>
              ))}
            </optgroup>
          ))}
        </Select> */}
        <Select
          aria-label={Locale.Settings.Model}
          defaultValue={value}
          onValueChange={(e) => {
            const [model, providerName] = e.split("@");
            props.updateConfig((config) => {
              config.model = ModalConfigValidator.model(model);
              config.providerName = providerName as ServiceProvider;
            });
          }}
        >
          <SelectTrigger className="max-w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(groupModels).map((providerName, index) => (
              <SelectGroup key={index}>
                <SelectLabel>{providerName}</SelectLabel>
                {groupModels[providerName].map((v, i) => (
                  <SelectItem
                    value={`${v.name}@${v.provider?.providerName}`}
                    key={i}
                  >
                    {v.displayName}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </ListItem>
      <ListItem
        title={Locale.Settings.Temperature.Title}
        subTitle={Locale.Settings.Temperature.SubTitle}
      >
        {/* <InputRange
          aria={Locale.Settings.Temperature.Title}
          value={props.modelConfig.temperature?.toFixed(1)}
          min="0"
          max="1" // lets limit it to 0-1
          step="0.1"
          onChange={(e) => {
            props.updateConfig(
              (config) =>
                (config.temperature = ModalConfigValidator.temperature(
                  e.currentTarget.valueAsNumber,
                )),
            );
          }}
        ></InputRange> */}
        <Slider
          aria-label={Locale.Settings.Temperature.Title}
          defaultValue={[props.modelConfig.temperature]}
          min={0}
          max={1}
          step={0.1}
          className="max-w-[200px]"
          onValueChange={(e) => {
            props.updateConfig(
              (config) =>
                (config.temperature = ModalConfigValidator.temperature(
                  e.at(0) as number,
                )),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.TopP.Title}
        subTitle={Locale.Settings.TopP.SubTitle}
      >
        {/* <InputRange
          aria={Locale.Settings.TopP.Title}
          value={(props.modelConfig.top_p ?? 1).toFixed(1)}
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => {
            props.updateConfig(
              (config) =>
                (config.top_p = ModalConfigValidator.top_p(
                  e.currentTarget.valueAsNumber,
                )),
            );
          }}
        ></InputRange> */}
        <Slider
          aria-label={Locale.Settings.TopP.Title}
          defaultValue={[(props.modelConfig.top_p ?? 1).toFixed(1) as any]}
          min={0}
          max={1}
          step={0.1}
          className="max-w-[200px]"
          onValueChange={(e) => {
            props.updateConfig(
              (config) =>
                (config.top_p = ModalConfigValidator.top_p(e.at(0) as number)),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.MaxTokens.Title}
        subTitle={Locale.Settings.MaxTokens.SubTitle}
      >
        {/* <input
          aria-label={Locale.Settings.MaxTokens.Title}
          type="number"
          min={1024}
          max={512000}
          value={props.modelConfig.max_tokens}
          onChange={(e) =>
            props.updateConfig(
              (config) =>
                (config.max_tokens = ModalConfigValidator.max_tokens(
                  e.currentTarget.valueAsNumber,
                )),
            )
          }
        ></input> */}
        <Input
          aria-label={Locale.Settings.MaxTokens.Title}
          type="number"
          min={1024}
          max={512000}
          defaultValue={props.modelConfig.max_tokens}
          className="max-w-[200px]"
          onChange={(value) =>
            props.updateConfig(
              (config) =>
                (config.max_tokens = ModalConfigValidator.max_tokens(
                  value.target.valueAsNumber,
                )),
            )
          }
        />
      </ListItem>

      {props.modelConfig?.providerName == ServiceProvider.Google ? null : (
        <>
          <ListItem
            title={Locale.Settings.PresencePenalty.Title}
            subTitle={Locale.Settings.PresencePenalty.SubTitle}
          >
            {/* <InputRange
              aria={Locale.Settings.PresencePenalty.Title}
              value={props.modelConfig.presence_penalty?.toFixed(1)}
              min="-2"
              max="2"
              step="0.1"
              onChange={(e) => {
                props.updateConfig(
                  (config) =>
                  (config.presence_penalty =
                    ModalConfigValidator.presence_penalty(
                      e.currentTarget.valueAsNumber,
                    )),
                );
              }}
            ></InputRange> */}
            <Slider
              aria-label={Locale.Settings.PresencePenalty.Title}
              defaultValue={[
                props.modelConfig.presence_penalty?.toFixed(1) as any,
              ]}
              min={-2}
              max={2}
              step={0.1}
              className="max-w-[200px]"
              onValueChange={(e) => {
                props.updateConfig(
                  (config) =>
                    (config.presence_penalty =
                      ModalConfigValidator.presence_penalty(e.at(0) as number)),
                );
              }}
            />
          </ListItem>

          <ListItem
            title={Locale.Settings.FrequencyPenalty.Title}
            subTitle={Locale.Settings.FrequencyPenalty.SubTitle}
          >
            {/* <InputRange
              aria={Locale.Settings.FrequencyPenalty.Title}
              value={props.modelConfig.frequency_penalty?.toFixed(1)}
              min="-2"
              max="2"
              step="0.1"
              onChange={(e) => {
                props.updateConfig(
                  (config) =>
                  (config.frequency_penalty =
                    ModalConfigValidator.frequency_penalty(
                      e.currentTarget.valueAsNumber,
                    )),
                );
              }}
            ></InputRange> */}
            <Slider
              aria-label={Locale.Settings.FrequencyPenalty.Title}
              defaultValue={[
                props.modelConfig.frequency_penalty?.toFixed(1) as any,
              ]}
              min={-2}
              max={2}
              step={0.1}
              className="max-w-[200px]"
              onValueChange={(e) => {
                props.updateConfig(
                  (config) =>
                    (config.frequency_penalty =
                      ModalConfigValidator.frequency_penalty(
                        e.at(0) as number,
                      )),
                );
              }}
            />
          </ListItem>

          <ListItem
            title={Locale.Settings.InjectSystemPrompts.Title}
            subTitle={Locale.Settings.InjectSystemPrompts.SubTitle}
          >
            {/* <input
              aria-label={Locale.Settings.InjectSystemPrompts.Title}
              type="checkbox"
              checked={props.modelConfig.enableInjectSystemPrompts}
              onChange={(e) =>
                props.updateConfig(
                  (config) =>
                    (config.enableInjectSystemPrompts =
                      e.currentTarget.checked),
                )
              }
            ></input> */}
            <Checkbox
              aria-label={Locale.Settings.InjectSystemPrompts.Title}
              checked={props.modelConfig.enableInjectSystemPrompts}
              onCheckedChange={(e) => {
                props.updateConfig(
                  (config) =>
                    (config.enableInjectSystemPrompts = Boolean(e.valueOf())),
                );
              }}
            />
          </ListItem>

          <ListItem
            title={Locale.Settings.InputTemplate.Title}
            subTitle={Locale.Settings.InputTemplate.SubTitle}
          >
            {/* <input
              aria-label={Locale.Settings.InputTemplate.Title}
              type="text"
              value={props.modelConfig.template}
              onChange={(e) =>
                props.updateConfig(
                  (config) => (config.template = e.currentTarget.value),
                )
              }
            ></input> */}
            <Input
              aria-label={Locale.Settings.InputTemplate.Title}
              defaultValue={props.modelConfig.template}
              className="max-w-[200px]"
              onChange={(value) =>
                props.updateConfig(
                  (config) => (config.template = value.target.value),
                )
              }
            />
          </ListItem>
        </>
      )}
      <ListItem
        title={Locale.Settings.HistoryCount.Title}
        subTitle={Locale.Settings.HistoryCount.SubTitle}
      >
        {/* <InputRange
          aria={Locale.Settings.HistoryCount.Title}
          title={props.modelConfig.historyMessageCount.toString()}
          value={props.modelConfig.historyMessageCount}
          min="0"
          max="64"
          step="1"
          onChange={(e) =>
            props.updateConfig(
              (config) => (config.historyMessageCount = e.target.valueAsNumber),
            )
          }
        ></InputRange> */}
        <Slider
          aria-label={Locale.Settings.HistoryCount.Title}
          defaultValue={[props.modelConfig.historyMessageCount]}
          min={0}
          max={64}
          step={1}
          className="max-w-[200px]"
          onValueChange={(e) =>
            props.updateConfig(
              (config) => (config.historyMessageCount = e.at(0) as number),
            )
          }
        />
      </ListItem>

      <ListItem
        title={Locale.Settings.CompressThreshold.Title}
        subTitle={Locale.Settings.CompressThreshold.SubTitle}
      >
        {/* <input
          aria-label={Locale.Settings.CompressThreshold.Title}
          type="number"
          min={500}
          max={4000}
          value={props.modelConfig.compressMessageLengthThreshold}
          onChange={(e) =>
            props.updateConfig(
              (config) =>
              (config.compressMessageLengthThreshold =
                e.currentTarget.valueAsNumber),
            )
          }
        ></input> */}
        <Input
          aria-label={Locale.Settings.CompressThreshold.Title}
          type="number"
          min={500}
          max={4000}
          defaultValue={props.modelConfig.compressMessageLengthThreshold}
          className="max-w-[200px]"
          onChange={(value) =>
            props.updateConfig(
              (config) =>
                (config.compressMessageLengthThreshold =
                  value.target.valueAsNumber),
            )
          }
        />
      </ListItem>
      <ListItem title={Locale.Memory.Title} subTitle={Locale.Memory.Send}>
        {/* <input
          aria-label={Locale.Memory.Title}
          type="checkbox"
          checked={props.modelConfig.sendMemory}
          onChange={(e) =>
            props.updateConfig(
              (config) => (config.sendMemory = e.currentTarget.checked),
            )
          }
        ></input> */}
        <Checkbox
          aria-label={Locale.Memory.Title}
          checked={props.modelConfig.sendMemory}
          onCheckedChange={(e) => {
            props.updateConfig(
              (config) => (config.sendMemory = Boolean(e.valueOf())),
            );
          }}
        />
      </ListItem>
      <ListItem
        title={Locale.Settings.CompressModel.Title}
        subTitle={Locale.Settings.CompressModel.SubTitle}
      >
        {/* <Select
          className={styles["select-compress-model"]}
          aria-label={Locale.Settings.CompressModel.Title}
          value={compressModelValue}
          onChange={(e) => {
            const [model, providerName] = e.currentTarget.value.split("@");
            props.updateConfig((config) => {
              config.compressModel = ModalConfigValidator.model(model);
              config.compressProviderName = providerName as ServiceProvider;
            });
          }}
        >
          {allModels
            .filter((v) => v.available)
            .map((v, i) => (
              <option value={`${v.name}@${v.provider?.providerName}`} key={i}>
                {v.displayName}({v.provider?.providerName})
              </option>
            ))}
        </Select> */}
        <Select
          aria-label={Locale.Settings.CompressModel.Title}
          defaultValue={compressModelValue}
          onValueChange={(e) => {
            const [model, providerName] = e.split("@");
            props.updateConfig((config) => {
              config.compressModel = ModalConfigValidator.model(model);
              config.compressProviderName = providerName as ServiceProvider;
            });
          }}
        >
          <SelectTrigger className="max-w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allModels
              .filter((v) => v.available)
              .map((v, i) => (
                <SelectItem
                  value={`${v.name}@${v.provider?.providerName}`}
                  key={i}
                >
                  {v.displayName}({v.provider?.providerName})
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </ListItem>
    </>
  );
}
